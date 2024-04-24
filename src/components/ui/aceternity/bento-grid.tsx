import { cn } from "@/lib/utils";
import { Card, CardContent } from "../card";
import Link from "@/components/Link";

export const BentoGrid = ({
  className,
  children,
}: {
  className?: string;
  children?: React.ReactNode;
}) => {
  return (
    <div
      className={cn(
        "grid lg:auto-rows-fr grid-cols-1 lg:grid-cols-3 gap-4 max-w-7xl mx-auto ",
        className
      )}
    >
      {children}
    </div>
  );
};

export const BentoGridItem = ({
  className,
  children,
  header,
  footer,
  icon,
}: {
  className?: string;
  children?: React.ReactNode;
  header?: React.ReactNode;
  footer?: React.ReactNode;
  icon?: React.ReactNode;
}) => {
  return (
    <Card className={cn(
      'min-w-0 lg:min-h-72 h-full border-transparent dark:border-border/20 dark:hover:border-border rounded-3xl lg:row-span-1 group/bento hover:shadow-lg shadow-md transition duration-300 p-4',
      className
    )}>
      <CardContent className="flex flex-col h-full space-y-4 p-0">
        {header}

        <div className="group-hover/bento:translate-x-2 transition duration-300 transform-gpu">
          {icon}
          {children}
        </div>

        {footer}
      </CardContent>
    </Card> 
  );
};

export const BentoGridLink = ({
  locale,
  href,
  className,
  children,
  header,
  icon,
}: {
  locale: string;
  href: string;
  className?: string;
  children?: React.ReactNode;
  header?: React.ReactNode;
  icon?: React.ReactNode;
}) => {
  return (
    <Card className={cn(
      'min-w-0 lg:min-h-72 h-full border-transparent dark:border-border/20 dark:hover:border-border rounded-3xl lg:row-span-1 group/bento hover:shadow-xl shadow-md transition duration-300',
      className
    )}>
      <Link 
        locale={locale} 
        href={href}
        passHref
      >
        <CardContent className="flex flex-col h-full space-y-4 p-4">
          {header}
    
          <div className="group-hover/bento:translate-x-2 transition duration-300 transform-gpu">
            {icon}
            {children}
          </div>
        </CardContent>
      </Link>
    </Card> 
  );
};
