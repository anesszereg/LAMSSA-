"use client";

import { CldUploadButton, CloudinaryUploadWidgetResults } from "next-cloudinary";
import { toast } from "sonner";

export function MediaUploader({ onUpload }: { onUpload?: (url: string) => void }) {
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="font-serif text-xl font-light">Upload Assets</h3>
        <CldUploadButton
          signatureEndpoint="/api/admin/media/sign"
          onSuccess={(result: CloudinaryUploadWidgetResults) => {
            const info = result.info as { secure_url?: string } | undefined;
            const url = info?.secure_url;
            if (url) {
              toast.success("Asset uploaded.");
              onUpload?.(url);
            }
          }}
          onError={() => toast.error("Upload failed.")}
          className="rounded-full bg-[#8B6F4E] px-6 py-2 text-sm font-medium text-white transition-colors hover:bg-[#7A6042]"
        >
          Upload Image
        </CldUploadButton>
      </div>
      <p className="text-sm text-foreground/60">
        Cloudinary signature is generated on demand by the admin media API.
      </p>
    </div>
  );
}
