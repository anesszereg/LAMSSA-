import "server-only";
import { mkdir, readFile, readdir, writeFile, rename, unlink, link } from "node:fs/promises";
import path from "node:path";
import { randomUUID } from "node:crypto";

const directory = path.join(process.cwd(), ".local-data", "room-orders");
export interface LocalRoomOrder {
  id: string;
  customer: string;
  phone: string;
  shippingAddress: { country: string; wilaya: string; wilayaName: string; commune: string; address: string };
  notes: string;
  total: number;
  currency: string;
  status: string;
  paymentStatus: string;
  date: string;
  items: { slug: string; name: string; price: number; quantity: number }[];
}

export async function saveRoomOrder(order: LocalRoomOrder) {
  await mkdir(directory, { recursive: true, mode: 0o700 });
  const temporary = path.join(directory, `${randomUUID()}.tmp`);
  await writeFile(temporary, JSON.stringify(order), { mode: 0o600, flag: "wx" });
  try {
    await link(temporary, path.join(directory, `${order.id}.json`));
  } catch (error) {
    if ((error as NodeJS.ErrnoException).code !== "EEXIST") throw error;
  } finally {
    await unlink(temporary);
  }
}

export async function listRoomOrders(): Promise<LocalRoomOrder[]> {
  let files: string[];
  try { files = await readdir(directory); } catch (error) {
    if ((error as NodeJS.ErrnoException).code === "ENOENT") return [];
    throw error;
  }
  const orders = await Promise.all(files.filter((file) => /^ROOM-[a-f0-9-]+\.json$/.test(file)).map(async (file) => JSON.parse(await readFile(path.join(directory, file), "utf8")) as LocalRoomOrder));
  return orders.sort((a, b) => b.date.localeCompare(a.date));
}

export async function updateRoomOrderStatus(id: string, status: string) {
  if (!/^ROOM-[a-f0-9-]{36}$/.test(id)) return false;
  const filename = path.join(directory, `${id}.json`);
  let order: LocalRoomOrder;
  try { order = JSON.parse(await readFile(filename, "utf8")); } catch (error) {
    if ((error as NodeJS.ErrnoException).code === "ENOENT") return false;
    throw error;
  }
  const temporary = path.join(directory, `${randomUUID()}.tmp`);
  await writeFile(temporary, JSON.stringify({ ...order, status }), { mode: 0o600, flag: "wx" });
  await rename(temporary, filename);
  return true;
}
