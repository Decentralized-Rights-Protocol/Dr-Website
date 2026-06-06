import { Link, Zap, Wrench, Globe, Crown, Gem, Activity, Monitor, Settings, Pen, Key, Sprout, Factory, Truck, Store, User, Sparkles, PartyPopper, Lightbulb, Clock, Medal, BookOpen, Hammer, Scale, Recycle } from 'lucide-react';

const iconMap: Record<string, React.ElementType> = {
  Link, Zap, Wrench, Hammer, Globe, Crown, Gem, Activity, Monitor, Settings, Pen, Key, Sprout, Factory, Truck, Store, User, Sparkles, PartyPopper, Lightbulb, Clock, Medal, BookOpen, Scale, Recycle
};

interface IconRendererProps {
  name: string;
  className?: string;
}

export function IconRenderer({ name, className }: IconRendererProps) {
  const IconComponent = iconMap[name];
  if (!IconComponent) return null;
  return <IconComponent className={className} />;
}
