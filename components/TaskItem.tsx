

// 'use client';

// import React from 'react';
// import { motion } from 'framer-motion';
// import { Check, Trash2 } from 'lucide-react';
// import { Task } from '@/types';
// import { cn } from '@/lib/utils';

// interface TaskItemProps {
//   task: Task;
//   onToggle: (id: string) => void;
//   onDelete: (id: string) => void;   // <-- NEW
// }

// export const TaskItem: React.FC<TaskItemProps> = ({ task, onToggle, onDelete }) => {
//   return (
//     <motion.div
//       layout
//       initial={{ opacity: 0, y: 10 }}
//       animate={{ opacity: 1, y: 0 }}
//       exit={{ opacity: 0, scale: 0.95 }}
//       className="group flex items-center gap-3 w-full py-2"
//     >
//       {/* Task toggle */}
//       <div
//         className="flex items-center gap-3 flex-1 cursor-pointer"
//         onClick={() => onToggle(task.id)}
//       >
//         <div
//           className={cn(
//             "w-5 h-5 rounded-full border border-white/30 flex items-center justify-center transition-all",
//             task.completed ? "bg-white border-white" : "group-hover:border-white/60"
//           )}
//         >
//           {task.completed && (
//             <motion.div
//               initial={{ scale: 0 }}
//               animate={{ scale: 1 }}
//               transition={{ type: "spring", stiffness: 400, damping: 20 }}
//             >
//               <Check size={12} className="text-black font-bold" strokeWidth={4} />
//             </motion.div>
//           )}
//         </div>

//         <span
//           className={cn(
//             "text-sm font-medium transition-all select-none",
//             task.completed ? "text-white/30 line-through" : "text-white/90"
//           )}
//         >
//           {task.title}
//         </span>
//       </div>

//       {/* DELETE BUTTON → SHOW ONLY ON HOVER */}
//       <button
//         onClick={() => onDelete(task.id)}
//         className="
//           opacity-0 group-hover:opacity-100
//           transition-opacity p-1 rounded-lg
//           hover:bg-white/10 text-white/50 hover:text-red-400
//         "
//       >
//         <Trash2 size={16} />
//       </button>
//     </motion.div>
//   );
// };


'use client';
import React from 'react';
import { motion } from 'framer-motion';
import { Check, Trash2 } from 'lucide-react';
import { Task } from '@/types';
import { cn } from '@/lib/utils';

interface TaskItemProps {
  task: Task;
  onToggle: (id: string) => void;
  onDelete: (id: string) => void;
}

export const TaskItem: React.FC<TaskItemProps> = ({ task, onToggle, onDelete }) => {
  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.95 }}

      /* 🌟 HOVER BG COLOR FIX */
      whileHover={{ backgroundColor: "rgba(255,255,255,0.07)" }}

      className="
        group flex items-center gap-3 p-3 rounded-xl
        cursor-grab active:cursor-grabbing
        transition-colors border border-transparent
      "
    >
      {/* Toggle Complete */}
      <div onClick={() => onToggle(task.id)} className="relative flex-shrink-0 cursor-pointer">
        <div
          className={cn(
            "w-5 h-5 rounded-full border border-white/30 flex items-center justify-center transition-all duration-300",
            task.completed ? "bg-white border-white" : "group-hover:border-white/60"
          )}
        >
          {task.completed && (
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring", stiffness: 400, damping: 20 }}
            >
              <Check size={12} className="text-black font-bold" strokeWidth={4} />
            </motion.div>
          )}
        </div>
      </div>

      {/* Title */}
      <span
        onClick={() => onToggle(task.id)}
        className={cn(
          "text-sm font-medium transition-all duration-300 select-none",
          task.completed ? "text-white/30 line-through" : "text-white/90"
        )}
      >
        {task.title}
      </span>

      {/* Delete Icon (show on hover) */}
      <button
        onClick={() => onDelete(task.id)}
        className="
          ml-auto opacity-0 group-hover:opacity-100 
          transition-opacity p-2 rounded-lg
          hover:bg-white/10
        "
      >
        <Trash2 size={16} className="text-white/50 group-hover:text-white" />
      </button>
    </motion.div>
  );
};
