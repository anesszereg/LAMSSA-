import { create } from "zustand";
import { RoomConfiguration } from "@/types";

const defaultConfig: RoomConfiguration = {
  wallColor: "#FAFAF8",
  flooring: "oak",
  finishes: {},
  lighting: "day",
};

interface ConfiguratorState extends RoomConfiguration {
  roomSlug: string | null;
  setRoomSlug: (slug: string | null) => void;
  setWallColor: (color: string) => void;
  setFlooring: (flooring: string) => void;
  setFinish: (productId: string, finishId: string) => void;
  setLighting: (lighting: "day" | "night") => void;
  reset: () => void;
  saveConfiguration: () => void;
  savedConfigurations: Record<string, RoomConfiguration>;
  loadConfiguration: (roomSlug: string) => void;
}

export const useConfiguratorStore = create<ConfiguratorState>((set, get) => ({
  ...defaultConfig,
  roomSlug: null,
  savedConfigurations: {},
  setRoomSlug: (slug) => set({ roomSlug: slug }),
  setWallColor: (wallColor) => set({ wallColor }),
  setFlooring: (flooring) => set({ flooring }),
  setFinish: (productId, finishId) =>
    set((state) => ({
      finishes: { ...state.finishes, [productId]: finishId },
    })),
  setLighting: (lighting) => set({ lighting }),
  reset: () => set({ ...defaultConfig, finishes: {} }),
  saveConfiguration: () => {
    const { roomSlug, savedConfigurations, ...config } = get();
    if (!roomSlug) return;
    set({
      savedConfigurations: {
        ...savedConfigurations,
        [roomSlug]: config as RoomConfiguration,
      },
    });
  },
  loadConfiguration: (roomSlug) => {
    const saved = get().savedConfigurations[roomSlug];
    if (saved) {
      set({ ...saved, roomSlug });
    } else {
      set({ ...defaultConfig, roomSlug });
    }
  },
}));
