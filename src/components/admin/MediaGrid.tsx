"use client";

import Image from "next/image";
import { useState } from "react";
import { deleteMedia, type MediaFile } from "@/lib/data/media-actions";
import { DeleteButton } from "./DeleteButton";

export function MediaGrid({ files }: { files: MediaFile[] }) {
  const [copied, setCopied] = useState<string | null>(null);

  const copy = async (url: string) => {
    await navigator.clipboard.writeText(url);
    setCopied(url);
    setTimeout(() => setCopied(null), 1500);
  };

  if (files.length === 0) {
    return <p className="font-sans text-sm text-taupe">No media uploaded yet.</p>;
  }

  return (
    <div className="grid grid-cols-2 gap-6 sm:grid-cols-3 md:grid-cols-4">
      {files.map((file) => (
        <div key={file.name} className="group relative">
          <div className="relative aspect-square overflow-hidden bg-chocolate">
            <Image src={file.url} alt={file.name} fill className="object-cover" unoptimized />
          </div>
          <p className="mt-2 truncate font-sans text-[11px] text-taupe">{file.name}</p>
          <div className="mt-1 flex items-center gap-4">
            <button
              type="button"
              onClick={() => copy(file.url)}
              className="font-sans text-[10px] uppercase tracking-[0.16em] text-taupe transition-colors hover:text-cream"
            >
              {copied === file.url ? "Copied" : "Copy URL"}
            </button>
            <DeleteButton action={deleteMedia.bind(null, file.name)} confirmMessage="Delete this file?" />
          </div>
        </div>
      ))}
    </div>
  );
}
