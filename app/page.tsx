

// 'use client';

// import React, { useState, useEffect } from 'react';
// import { motion, AnimatePresence } from 'framer-motion';
// import { Search, Plus, LayoutGrid } from 'lucide-react';
// import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';

// import { CategoryItem } from '@/components/CategoryItem';
// import { TaskItem } from '@/components/TaskItem';
// import { AddListModal } from '@/components/AddListModal';
// import { DynamicIcon } from '@/components/Icons';
// import { generateId } from '@/lib/utils';
// import { Category } from '@/types';

// const INITIAL_DATA: Category[] = [
//   {
//     id: '1',
//     name: 'Development Tasks',
//     iconName: 'code',
//     tasks: [
//       { id: 't1', title: 'Setup React Project', completed: true },
//       { id: 't2', title: 'Configure Tailwind', completed: true },
//       { id: 't3', title: 'Implement Animation', completed: false }
//     ]
//   },
//   {
//     id: '2',
//     name: 'Design Tasks',
//     iconName: 'palette',
//     tasks: [
//       { id: 'd1', title: 'Update Figma components', completed: true },
//       { id: 'd2', title: 'Create new icons', completed: false }
//     ]
//   }
// ];

// export default function Page() {
//   // Load categories
//   const [categories, setCategories] = useState<Category[]>([]);
//   const [loaded, setLoaded] = useState(false);

//   useEffect(() => {
//     const saved = localStorage.getItem("taskCategories");
//     setCategories(saved ? JSON.parse(saved) : INITIAL_DATA);
//     setLoaded(true);
//   }, []);

//   useEffect(() => {
//     if (loaded) {
//       localStorage.setItem("taskCategories", JSON.stringify(categories));
//     }
//   }, [categories, loaded]);

//   const [activeCategoryId, setActiveCategoryId] = useState<string | null>(null);
//   const [searchQuery, setSearchQuery] = useState('');
//   const [isAddingList, setIsAddingList] = useState(false);

//   const activeCategory = categories.find(c => c.id === activeCategoryId);

//   const filtered = categories.filter(c =>
//     c.name.toLowerCase().includes(searchQuery.toLowerCase())
//   );

//   const handleCategoryClick = (id: string) => setActiveCategoryId(id);
//   const handleBack = () => setActiveCategoryId(null);

//   const handleTaskToggle = (taskId: string) => {
//     if (!activeCategoryId) return;

//     setCategories(prev =>
//       prev.map(cat =>
//         cat.id !== activeCategoryId
//           ? cat
//           : {
//               ...cat,
//               tasks: cat.tasks.map(t =>
//                 t.id === taskId ? { ...t, completed: !t.completed } : t
//               )
//             }
//       )
//     );
//   };

//   // ⭐ DELETE TASK
//   const handleDeleteTask = (taskId: string) => {
//     if (!activeCategoryId) return;
//     setCategories(prev =>
//       prev.map(cat =>
//         cat.id !== activeCategoryId
//           ? cat
//           : { ...cat, tasks: cat.tasks.filter(t => t.id !== taskId) }
//       )
//     );
//   };

//   const handleAddList = (name: string, icon: string) => {
//     const newList: Category = {
//       id: generateId(),
//       name,
//       iconName: icon,
//       tasks: []
//     };
//     setCategories(prev => [newList, ...prev]);
//     setIsAddingList(false);
//   };

//   const handleDeleteList = (id: string) => {
//     setCategories(prev => prev.filter(c => c.id !== id));
//     if (activeCategoryId === id) setActiveCategoryId(null);
//   };

//   // DRAG / DROP
//   const onDragEnd = (result: any) => {
//     const { source, destination, type } = result;
//     if (!destination) return;

//     if (type === "category") {
//       const updated = [...categories];
//       const [moved] = updated.splice(source.index, 1);
//       updated.splice(destination.index, 0, moved);
//       setCategories(updated);
//       return;
//     }

//     if (activeCategoryId && type === "task") {
//       const updated = [...categories];
//       const cat = updated.find(c => c.id === activeCategoryId);
//       if (!cat) return;

//       const tasks = [...cat.tasks];
//       const [movedTask] = tasks.splice(source.index, 1);
//       tasks.splice(destination.index, 0, movedTask);

//       cat.tasks = tasks;
//       setCategories(updated);
//     }
//   };

//   if (!loaded) return null;

//   return (
//     <div className="app-root relative min-h-screen w-full flex items-center justify-center bg-gradient-to-br from-indigo-300 via-purple-300 to-blue-200 overflow-hidden">
//       <div className="absolute inset-0 z-0 bg-black/40 backdrop-blur-[4px]" />

//       <motion.div
//         initial={{ opacity: 0, scale: 0.9 }}
//         animate={{ opacity: 1, scale: 1 }}
//         transition={{ duration: 0.5 }}
//         className="relative z-10 w-[400px] h-[600px] rounded-[32px] overflow-hidden shadow-2xl border border-white/10"
//         style={{ background: 'rgba(40,40,40,0.6)', backdropFilter: 'blur(20px)' }}
//       >
//         <div className="text-center text-white/80 text-xl font-semibold mt-4">
//           To-Do App
//         </div>

//         <AnimatePresence mode="wait">
//           {!activeCategory ? (
//             // CATEGORY LIST
//             <motion.div key="cat" className="flex flex-col h-full p-6">
//               <div className="flex items-center gap-3 mb-6 relative z-20">
//                 <div className="relative flex-1">
//                   <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-white/30" size={18} />
//                   <input
//                     type="text"
//                     placeholder="Search list"
//                     value={searchQuery}
//                     onChange={(e) => setSearchQuery(e.target.value)}
//                     className="w-full bg-white/5 border border-white/5 rounded-2xl pl-10 pr-4 py-3 text-sm text-white placeholder-white/30"
//                   />
//                 </div>

//                 <button
//                   onClick={() => setIsAddingList(true)}
//                   className="p-3 bg-white/10 hover:bg-white/20 text-white rounded-2xl border border-white/5"
//                 >
//                   <Plus size={20} />
//                 </button>
//               </div>

//               <DragDropContext onDragEnd={onDragEnd}>
//                 <Droppable droppableId="category" type="category">
//                   {(provided) => (
//                     <div
//                       ref={provided.innerRef}
//                       {...provided.droppableProps}
//                       className="flex-1 overflow-y-auto custom-scrollbar"
//                     >
//                       {filtered.length ? (
//                         filtered.map((cat, index) => (
//                           <Draggable key={cat.id} draggableId={cat.id} index={index}>
//                             {(drag) => (
//                               <div ref={drag.innerRef} {...drag.draggableProps} {...drag.dragHandleProps}>
//                                 <CategoryItem
//                                   category={cat}
//                                   onClick={handleCategoryClick}
//                                   onDelete={handleDeleteList}
//                                 />
//                               </div>
//                             )}
//                           </Draggable>
//                         ))
//                       ) : (
//                         <div className="text-center text-white/40 mt-10">
//                           <LayoutGrid className="mx-auto mb-3" /> No lists found
//                         </div>
//                       )}

//                       {provided.placeholder}
//                     </div>
//                   )}
//                 </Droppable>
//               </DragDropContext>
//             </motion.div>
//           ) : (
//             // TASK LIST
//             <motion.div key="task" className="flex flex-col h-full p-6">
//               <div className="flex items-center gap-3 mb-4">
//                 <button
//                   onClick={handleBack}
//                   className="p-2 rounded-lg bg-white/5 text-white/60"
//                 >
//                   Back
//                 </button>

//                 <div className="flex items-center gap-3">
//                   <div className="p-2 rounded-xl bg-white/5 text-white/80">
//                     <DynamicIcon name={activeCategory.iconName} />
//                   </div>

//                   <div>
//                     <div className="text-white font-semibold">
//                       {activeCategory.name}
//                     </div>
//                     <div className="text-xs text-white/40">
//                       {activeCategory.tasks.length} tasks
//                     </div>
//                   </div>
//                 </div>
//               </div>

//               <DragDropContext onDragEnd={onDragEnd}>
//                 <Droppable droppableId="task" type="task">
//                   {(provided) => (
//                     <div
//                       ref={provided.innerRef}
//                       {...provided.droppableProps}
//                       className="flex-1 overflow-y-auto custom-scrollbar"
//                     >
//                       {activeCategory.tasks.map((task, index) => (
//                         <Draggable key={task.id} draggableId={task.id} index={index}>
//                           {(drag) => (
//                             <div ref={drag.innerRef} {...drag.draggableProps} {...drag.dragHandleProps}>
//                               <TaskItem
//                                 task={task}
//                                 onToggle={handleTaskToggle}
//                                 onDelete={handleDeleteTask}
//                               />
//                             </div>
//                           )}
//                         </Draggable>
//                       ))}
//                       {provided.placeholder}
//                     </div>
//                   )}
//                 </Droppable>
//               </DragDropContext>
//             </motion.div>
//           )}
//         </AnimatePresence>

//         {isAddingList && (
//           <AddListModal
//             onClose={() => setIsAddingList(false)}
//             onAdd={handleAddList}
//           />
//         )}
//       </motion.div>
//     </div>
//   );
// }

'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Plus, LayoutGrid } from 'lucide-react';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';

import { CategoryItem } from '@/components/CategoryItem';
import { TaskItem } from '@/components/TaskItem';
import { AddListModal } from '@/components/AddListModal';
import { DynamicIcon } from '@/components/Icons';
import { generateId } from '@/lib/utils';
import { Category } from '@/types';

const INITIAL_DATA: Category[] = [
  {
    id: '1',
    name: 'Development Tasks',
    iconName: 'code',
    tasks: [
      { id: 't1', title: 'Setup React Project', completed: true, subtasks: [] },
      { id: 't2', title: 'Configure Tailwind', completed: true, subtasks: [] },
      { id: 't3', title: 'Implement Animation', completed: false, subtasks: [] }
    ]
  },
  {
    id: '2',
    name: 'Design Tasks',
    iconName: 'palette',
    tasks: [
      { id: 'd1', title: 'Update Figma components', completed: true, subtasks: [] },
      { id: 'd2', title: 'Create new icons', completed: false, subtasks: [] }
    ]
  }
];

export default function Page() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem("taskCategories");
    setCategories(saved ? JSON.parse(saved) : INITIAL_DATA);
    setLoaded(true);
  }, []);

  useEffect(() => {
    if (loaded) {
      localStorage.setItem("taskCategories", JSON.stringify(categories));
    }
  }, [categories, loaded]);

  const [activeCategoryId, setActiveCategoryId] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [isAddingList, setIsAddingList] = useState(false);
  const [newTaskInput, setNewTaskInput] = useState('');

  const activeCategory = categories.find(c => c.id === activeCategoryId);
  const filtered = categories.filter(c =>
    c.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleCategoryClick = (id: string) => setActiveCategoryId(id);
  const handleBack = () => setActiveCategoryId(null);

  const handleTaskToggle = (taskId: string) => {
    if (!activeCategoryId) return;
    setCategories(prev =>
      prev.map(cat =>
        cat.id !== activeCategoryId
          ? cat
          : {
              ...cat,
              tasks: cat.tasks.map(t =>
                t.id === taskId ? { ...t, completed: !t.completed } : t
              )
            }
      )
    );
  };

  const handleAddList = (name: string, icon: string) => {
    setCategories(prev => [
      { id: generateId(), name, iconName: icon, tasks: [] },
      ...prev
    ]);
    setIsAddingList(false);
  };

  const handleDeleteList = (id: string) => {
    setCategories(prev => prev.filter(c => c.id !== id));
    if (activeCategoryId === id) setActiveCategoryId(null);
  };

  // ⭐ DELETE TASK
  const handleDeleteTask = (taskId: string) => {
    if (!activeCategoryId) return;
    setCategories(prev =>
      prev.map(cat =>
        cat.id !== activeCategoryId
          ? cat
          : { ...cat, tasks: cat.tasks.filter(t => t.id !== taskId) }
      )
    );
  };

  // ⭐ ADD TASK
  const addNewTask = () => {
    if (!newTaskInput.trim() || !activeCategoryId) return;

    setCategories(prev =>
      prev.map(cat =>
        cat.id !== activeCategoryId
          ? cat
          : {
              ...cat,
              tasks: [
                ...cat.tasks,
                {
                  id: generateId(),
                  title: newTaskInput.trim(),
                  completed: false,
                  subtasks: []   // ⭐ REQUIRED FIX
                }
              ]
            }
      )
    );

    setNewTaskInput('');
  };

  const onDragEnd = (result: any) => {
    const { source, destination, type } = result;
    if (!destination) return;

    if (type === "category") {
      const updated = [...categories];
      const [moved] = updated.splice(source.index, 1);
      updated.splice(destination.index, 0, moved);
      setCategories(updated);
      return;
    }

    if (activeCategoryId && type === "task") {
      const updated = [...categories];
      const cat = updated.find(c => c.id === activeCategoryId);
      if (!cat) return;

      const tasks = [...cat.tasks];
      const [movedTask] = tasks.splice(source.index, 1);
      tasks.splice(destination.index, 0, movedTask);

      cat.tasks = tasks;
      setCategories(updated);
    }
  };

  if (!loaded) return null;

  return (
    <div className="app-root relative min-h-screen w-full flex items-center justify-center bg-gradient-to-br from-indigo-300 via-purple-300 to-blue-200 overflow-hidden">
      <div className="absolute inset-0 z-0 bg-black/40 backdrop-blur-[4px]" />

      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.4 }}
        className="relative z-10 w-[400px] h-[600px] rounded-[32px] overflow-hidden shadow-2xl border border-white/10"
        style={{ background: 'rgba(40,40,40,0.6)', backdropFilter: 'blur(20px)' }}
      >
        <div className="text-center text-white/80 text-xl font-semibold mt-4">
          To-Do App
        </div>

        <AnimatePresence mode="wait">
          {!activeCategory ? (
            /** CATEGORY LIST SCREEN */
            <motion.div key="cat" className="flex flex-col h-full p-6">
              {/* SEARCH */}
              <div className="flex items-center gap-3 mb-6 relative z-20">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-white/30" size={18} />
                  <input
                    type="text"
                    placeholder="Search list"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full bg-white/5 border border-white/5 rounded-2xl pl-10 pr-4 py-3 text-sm text-white placeholder-white/30"
                  />
                </div>

                <button
                  onClick={() => setIsAddingList(true)}
                  className="p-3 bg-white/10 hover:bg-white/20 text-white rounded-2xl border border-white/5"
                >
                  <Plus size={20} />
                </button>
              </div>

              {/* CATEGORY DRAG LIST */}
              <DragDropContext onDragEnd={onDragEnd}>
                <Droppable droppableId="category" type="category">
                  {(provided) => (
                    <div ref={provided.innerRef} {...provided.droppableProps} className="flex-1 overflow-y-auto custom-scrollbar">
                      {filtered.length ? (
                        filtered.map((cat, index) => (
                          <Draggable key={cat.id} draggableId={cat.id} index={index}>
                            {(drag) => (
                              <div ref={drag.innerRef} {...drag.draggableProps} {...drag.dragHandleProps}>
                                <CategoryItem
                                  category={cat}
                                  onClick={handleCategoryClick}
                                  onDelete={handleDeleteList}
                                />
                              </div>
                            )}
                          </Draggable>
                        ))
                      ) : (
                        <div className="text-center text-white/40 mt-10">
                          <LayoutGrid className="mx-auto mb-3" /> No lists found
                        </div>
                      )}
                      {provided.placeholder}
                    </div>
                  )}
                </Droppable>
              </DragDropContext>
            </motion.div>
          ) : (
            /** TASKS SCREEN */
            <motion.div key="task" className="flex flex-col h-full p-6">
              {/* HEADER */}
              <div className="flex items-center gap-3 mb-4">
                <button onClick={handleBack} className="p-2 rounded-lg bg-white/5 text-white/60">
                  Back
                </button>

                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-xl bg-white/5 text-white/80">
                    <DynamicIcon name={activeCategory.iconName} />
                  </div>
                  <div>
                    <div className="text-white font-semibold">{activeCategory.name}</div>
                    <div className="text-xs text-white/40">{activeCategory.tasks.length} tasks</div>
                  </div>
                </div>
              </div>

              {/* ADD TASK */}
              <div className="flex items-center gap-2 mb-3">
                <input
                  type="text"
                  placeholder="Add new task..."
                  value={newTaskInput}
                  onChange={(e) => setNewTaskInput(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && addNewTask()}
                  className="flex-1 bg-white/5 border border-white/10 rounded-xl px-3 py-2 text-white placeholder-white/40"
                />

                <button
                  onClick={addNewTask}
                  className="px-3 py-2 bg-white/20 hover:bg-white/30 text-white rounded-xl"
                >
                  + Add Task
                </button>
              </div>

              {/* TASK LIST */}
              <DragDropContext onDragEnd={onDragEnd}>
                <Droppable droppableId="task" type="task">
                  {(provided) => (
                    <div ref={provided.innerRef} {...provided.droppableProps} className="flex-1 overflow-y-auto custom-scrollbar">
                      {activeCategory.tasks.map((task, index) => (
                        <Draggable key={task.id} draggableId={task.id} index={index}>
                          {(drag) => (
                            <div ref={drag.innerRef} {...drag.draggableProps} {...drag.dragHandleProps}>
                              <TaskItem
                                task={task}
                                onToggle={handleTaskToggle}
                                onDelete={() => handleDeleteTask(task.id)}
                              />
                            </div>
                          )}
                        </Draggable>
                      ))}
                      {provided.placeholder}
                    </div>
                  )}
                </Droppable>
              </DragDropContext>
            </motion.div>
          )}
        </AnimatePresence>

        {isAddingList && (
          <AddListModal onClose={() => setIsAddingList(false)} onAdd={handleAddList} />
        )}
      </motion.div>
    </div>
  );
}
