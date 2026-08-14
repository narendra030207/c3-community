"use client";

import { useState } from "react";
import { Plus, Edit, Trash2 } from "lucide-react";
import { motion } from "motion/react";
import Image from "next/image";

const DEMO_DATA = Array.from({ length: 10 }).map((_, i) => ({
  id: i + 1,
  title: `Gallery Item ${i + 1}`,
  category: ["EVENT", "WORKSHOP", "HACKATHON", "COMPETITION"][i % 4],
  imageUrl: `https://picsum.photos/seed/${i}/400/300`
}));

export default function AdminGalleryPage() {
  const [data] = useState(DEMO_DATA);

  return (
    <div className="p-6 space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <h1 className="text-2xl font-bold text-white">Gallery Management</h1>
        <button className="px-4 py-2 rounded-xl bg-gradient-to-r from-blue-600 to-violet-600 text-white font-medium hover:from-blue-500 hover:to-violet-500 transition-all flex items-center gap-2">
          <Plus className="w-4 h-4" /> Add Image
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {data.map((item) => (
          <motion.div
            key={item.id}
            whileHover={{ scale: 1.02 }}
            className="group relative bg-white/5 border border-white/10 rounded-2xl overflow-hidden aspect-video"
          >
            <Image src={item.imageUrl} alt={item.title} fill className="object-cover" unoptimized />
            <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col justify-between p-4">
              <div className="flex justify-between items-start">
                <span className="px-2 py-1 text-xs rounded-full bg-white/20 text-white backdrop-blur-md">
                  {item.category}
                </span>
                <div className="flex gap-2">
                  <button className="p-2 bg-white/20 hover:bg-white/30 rounded-lg text-white backdrop-blur-md transition-colors"><Edit className="w-4 h-4" /></button>
                  <button className="p-2 bg-red-500/20 hover:bg-red-500/40 rounded-lg text-red-200 backdrop-blur-md transition-colors"><Trash2 className="w-4 h-4" /></button>
                </div>
              </div>
              <p className="text-white font-medium">{item.title}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
