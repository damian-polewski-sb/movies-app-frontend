import {
  arrow,
  autoUpdate,
  flip,
  FloatingArrow,
  FloatingPortal,
  offset,
  Placement,
  shift,
  useDismiss,
  useFloating,
  useFocus,
  useHover,
  useInteractions,
  useMergeRefs,
  useRole,
} from "@floating-ui/react";
import {
  cloneElement,
  PropsWithChildren,
  ReactElement,
  useRef,
  useState,
} from "react";

interface TooltipProps {
  content: string;
  placement?: Placement;
}

type TooltipPropsWithChildren = PropsWithChildren<TooltipProps>;

export const Tooltip = ({
  content,
  placement = "top",
  children,
}: TooltipPropsWithChildren) => {
  const [isOpen, setIsOpen] = useState(false);

  const arrowRef = useRef(null);

  const { refs, floatingStyles, context } = useFloating({
    open: isOpen,
    onOpenChange: setIsOpen,
    placement,
    middleware: [offset(10), flip(), shift(), arrow({ element: arrowRef })],
    whileElementsMounted: autoUpdate,
  });

  const hover = useHover(context, { move: false });
  const focus = useFocus(context);
  const dismiss = useDismiss(context);
  const role = useRole(context, {
    role: "tooltip",
  });

  const { getReferenceProps, getFloatingProps } = useInteractions([
    hover,
    focus,
    dismiss,
    role,
  ]);

  const childrenRef = (children as any).ref;
  const ref = useMergeRefs([context.refs.setReference, childrenRef]);

  return (
    <>
      {cloneElement(children as ReactElement, {
        ref,
        ...getReferenceProps(),
      })}
      {isOpen && (
        <FloatingPortal>
          <div
            ref={refs.setFloating}
            style={floatingStyles}
            {...getFloatingProps()}
            className="px-2 py-1 font-semibold text-black bg-white rounded"
          >
            <FloatingArrow
              width={10}
              height={5}
              ref={arrowRef}
              context={context}
              className="fill-white"
            />
            {content}
          </div>
        </FloatingPortal>
      )}
    </>
  );
};
