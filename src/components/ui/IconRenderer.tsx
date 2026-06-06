import { Link, Zap, Wrench, Globe, Crown, Pickaxe, Gem, Activity, IdCard, Monitor, Settings, Handshake, Pen, Key, Sprout, Factory, Truck, Store, User, Sparkles, PartyPopper, Lightbulb, Clock, Medal, BookOpen, Hammer } from 'lucide-react';

const iconMap: Record<string, React.ElementType> = {
  Link: Link,
  Zap: Zap,
  Wrench: Wrench,
  Hammer: Hammer,
  Globe: Globe,
  Crown: Crown,
  Pickaxe: Pickaxe,
  Gem: Gem,
  Activity: Activity,
  IdCard: IdCard,
  Monitor: Monitor,
  Settings: Settings,
  Handshake: Handshake,
  Pen: Pen,
  Key: Key,
  Sprout: Sprout,
  Factory: Factory,
  Truck: Truck,
  Store: Store,
  User: User,
  Sparkles: Sparkles,
  PartyPopper: PartyPopper,
  Lightbulb: Lightbulb,
  Clock: Clock,
  Medal: Medal,
  BookOpen: BookOpen,
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
