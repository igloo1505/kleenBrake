"use client";
import { useCallback, useRef, useEffect, MouseEventHandler } from "react";
import { useRouter } from "next/navigation";
import clsx from "clsx";

const MediaModalWrapper = ({ children, allowLarge }: { children: React.ReactNode, allowLarge?: boolean }) => {
    const overlay = useRef<HTMLDivElement>(null!);
    const wrapper = useRef<HTMLDivElement>(null!);
    const router = useRouter();

    const onDismiss = useCallback(() => {
        router.back();
    }, [router]);

    const onClick: MouseEventHandler = useCallback(
        (e) => {
            if (e.target === overlay.current || e.target === wrapper.current) {
                if (onDismiss) onDismiss();
            }
        },
        [onDismiss, overlay, wrapper]
    );

    const onKeyDown = useCallback(
        (e: KeyboardEvent) => {
            if (e.key === "Escape") onDismiss();
        },
        [onDismiss]
    );

    const setScale = () => {
        const ptop = wrapper.current.getBoundingClientRect()
        const isLarge = ptop.height >= window.innerHeight - 48
        wrapper.current.style.transform = isLarge ? `translate(-50%, ${0}px)` : 'translate(-50%, -50%)'
        wrapper.current.style.top = isLarge ? '16px' : "50%"
    }

    useEffect(() => {
        document.addEventListener("keydown", onKeyDown);
        window.addEventListener("resize", setScale)
        setScale()
        return () => {
            document.removeEventListener("keydown", onKeyDown);
            window.removeEventListener("resize", setScale)
        }
    }, [onKeyDown]);

    return (
        <>
            <div
                ref={overlay}
                className="fixed z-10 left-0 right-0 top-0 bottom-0 mx-auto bg-black/60"
                onClick={onClick}
            />
            <div
                ref={wrapper}
                className={clsx("absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-fit min-h-fit flex flex-col justify-center items-center z-[11]", allowLarge && "lg:w-10/12")}
            >
                {children}
            </div>
        </>
    );
}



export default MediaModalWrapper
