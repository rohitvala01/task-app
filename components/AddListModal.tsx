




'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { X, Check } from 'lucide-react';
import { DynamicIcon, IconMap } from './Icons';

interface AddListModalProps {
  onClose: () => void;
  onAdd: (name: string, icon: string) => void;
}

export const AddListModal: React.FC<AddListModalProps> = ({ onClose, onAdd }) => {
  const [name, setName] = useState('');
  const [selectedIcon, setSelectedIcon] = useState('todo');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (name.trim()) onAdd(name, selectedIcon);
  };

  const availableIcons = Object.keys(IconMap).filter((k) => k !== 'default');

  return (
    <motion.div
      className="fixed inset-0 z-[999] flex items-center justify-center p-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      {/* BACKDROP */}
      <motion.div
        className="absolute inset-0 bg-black/60 backdrop-blur-md"
        onClick={onClose}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      />

      {/* MODAL */}
      <motion.div
        initial={{ scale: 0.85, opacity: 0, y: 40 }}
        animate={{
          scale: 1,
          opacity: 1,
          y: 0,
          transition: {
            type: "spring",
            stiffness: 320,
            damping: 25,
          },
        }}
        exit={{
          scale: 0.9,
          opacity: 0,
          y: 20,
          transition: { duration: 0.15 }
        }}
        className="relative w-full max-w-xs bg-[#1A1A1A] border border-white/10 
        rounded-3xl p-6 shadow-2xl overflow-hidden"
      >
        {/* BG LIGHTS */}
        <div className="absolute -top-10 -right-10 w-32 h-32 bg-purple-500/20 blur-3xl rounded-full" />
        <div className="absolute -bottom-10 -left-10 w-32 h-32 bg-blue-500/20 blur-3xl rounded-full" />

        <div className="relative z-10">
          {/* HEADER */}
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-lg font-semibold text-white">New List</h2>
            <button
              onClick={onClose}
              className="p-1 rounded-full hover:bg-white/10 transition-colors text-white/50 hover:text-white"
            >
              <X size={20} />
            </button>
          </div>

          {/* FORM */}
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* INPUT */}
            <div>
              <input
                autoFocus
                type="text"
                placeholder="List name..."
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 
                text-white placeholder-white/30 focus:outline-none focus:border-white/30 
                focus:ring-1 focus:ring-white/30 transition-all"
              />
            </div>

            {/* ICON SELECTOR */}
            <div>
              <label className="text-xs text-white/40 ml-1">Icon</label>

              <div className="grid grid-cols-5 gap-2 mt-2">
                {availableIcons.map((icon) => (
                  <motion.button
                    whileTap={{ scale: 0.9 }}
                    key={icon}
                    type="button"
                    onClick={() => setSelectedIcon(icon)}
                    className={`p-2 rounded-lg flex items-center justify-center transition-all
                      ${
                        selectedIcon === icon
                          ? 'bg-white text-black scale-110 shadow-lg shadow-white/10'
                          : 'bg-white/5 text-white/40 hover:bg-white/10 hover:text-white/80'
                      }`}
                  >
                    <DynamicIcon name={icon} size={18} />
                  </motion.button>
                ))}
              </div>
            </div>

            {/* SUBMIT */}
            <motion.button
              type="submit"
              disabled={!name.trim()}
              whileTap={{ scale: 0.96 }}
              className="w-full bg-white text-black font-semibold py-3 rounded-xl 
              hover:bg-white/90 disabled:opacity-50 disabled:cursor-not-allowed 
              transition-all flex items-center justify-center gap-2"
            >
              <span>Create List</span>
              <Check size={16} />
            </motion.button>
          </form>
        </div>
      </motion.div>
    </motion.div>
  );
};
