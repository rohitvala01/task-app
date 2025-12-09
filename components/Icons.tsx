'use client';
import React from 'react';
import {
  Code2,
  Palette,
  Users,
  BookOpen,
  MessageSquare,
  User,
  Layout,
  Briefcase,
  Folder,
  ListTodo,
  Sparkles
} from 'lucide-react';

export const IconMap: Record<string, React.ElementType> = {
  code: Code2,
  palette: Palette,
  users: Users,
  book: BookOpen,
  message: MessageSquare,
  user: User,
  layout: Layout,
  briefcase: Briefcase,
  default: Folder,
  todo: ListTodo,
  sparkles: Sparkles
};

interface IconProps {
  name: string;
  className?: string;
  size?: number;
}

export const DynamicIcon: React.FC<IconProps> = ({ name, className, size = 20 }) => {
  const IconComponent = IconMap[name] || IconMap['default'];
  return <IconComponent className={className} size={size} />;
};

export default DynamicIcon;
