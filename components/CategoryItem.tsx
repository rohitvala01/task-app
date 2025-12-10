
'use client';
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Trash2, GripVertical } from 'lucide-react';
import { Category } from '@/types';
import { DynamicIcon } from './Icons';

interface CategoryItemProps {
  category: Category;
  onClick: (id: string) => void;
  onDelete: (id: string) => void;
}

export const CategoryItem: React.FC<CategoryItemProps> = ({
  category,
  onClick,
  onDelete
}) => {
  const [isHovered, setIsHovered] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

  const completedCount = category.tasks.filter(t => t.completed).length;
  const totalCount = category.tasks.length;

  const handleDeleteClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (showDeleteConfirm) {
      onDelete(category.id);
    } else {
      setShowDeleteConfirm(true);
      setTimeout(() => setShowDeleteConfirm(false), 3000);
    }
  };

  return (
    <motion.div
      layout
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => {
        setIsHovered(false);
        setShowDeleteConfirm(false);
      }}
      onClick={() => onClick(category.id)}
      
      /* DRAG CATEGORY HERE */

      className="group relative flex items-center justify-between p-4 mb-2 
      rounded-2xl bg-white/5 hover:bg-white/10 transition-all duration-300
      border border-transparent hover:border-white/10 overflow-hidden
      cursor-grab active:cursor-grabbing"
    >
      <div className="flex items-center gap-4 z-10">
        <div className="p-2 rounded-xl bg-white/5 text-white/80 
        group-hover:text-white group-hover:scale-110 transition-all duration-300">
          <DynamicIcon name={category.iconName} size={20} />
        </div>

        <div className="flex flex-col">
          <span className="text-sm font-medium text-white/90 group-hover:text-white transition-colors">
            {category.name}
          </span>
          <span className="text-xs text-white/40">
            {completedCount}/{totalCount} completed
          </span>
        </div>
      </div>

      <div className="flex items-center gap-2 z-10">
        <div
          className={`text-xs font-medium text-white/30 bg-white/5 px-2 py-1 rounded-md 
          transition-opacity duration-200 ${isHovered ? 'opacity-0' : 'opacity-100'}`}
        >
          {category.tasks.length}
        </div>

        <AnimatePresence>
          {isHovered && (
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 10 }}
              className="absolute right-4 flex items-center gap-2"
            >
              <button
                onClick={handleDeleteClick}
                className={`p-2 rounded-full transition-all duration-200 
                ${
                  showDeleteConfirm
                    ? 'bg-red-500/20 text-red-400 hover:bg-red-500/30'
                    : 'bg-white/5 text-white/60 hover:bg-white/10 hover:text-white'
                }`}
                title={showDeleteConfirm ? 'Click again to confirm' : 'Delete list'}
              >
                <Trash2 size={16} />
              </button>

              {!showDeleteConfirm && (
                <div className="cursor-grab active:cursor-grabbing text-white/20 hover:text-white/60 p-1">
                  <GripVertical size={16} />
                </div>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <div
        className="absolute bottom-0 left-0 h-[2px] bg-white/20 transition-all duration-500"
        style={{
          width: `${totalCount > 0
            ? (completedCount / totalCount) * 100
            : 0}%`
        }}
      />
    </motion.div>
  );
};
