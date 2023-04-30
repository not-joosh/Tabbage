/*
*       MOTION ANIMATIONS FOR FRAME-MOTION
*/
export const transition = { type: "spring", duration: 0.8 };
export const slideAnimation = (direction: unknown) => {
    return {
        initial: {
            x: direction === "left" ? -100 : direction === "right" ? 100 : 0,
            y: direction === "up" ? 100 : direction === "down" ? -100 : 0,
            opacity: 0,
            transition: { ...transition, delay: 0.5 },
        },
        animate: {
            x: 0,
            y: 0,
            opacity: 1,
            transition: { ...transition, delay: 0 },
        },
        exit: {
            x: direction === "left" ? -100 : direction === "right" ? 100 : 0,
            y: direction === "up" ? 100 : direction === "down" ? -100 : 0,
            transition: { ...transition, delay: 0 },
        },
    };
};

export const fadeAnimation = {
    initial: {
        opacity: 0,
        transition: { ...transition, delay: 0.5 },
    },
    animate: {
        opacity: 1,
        transition: { ...transition, delay: 0 },
    },
    exit: {
        opacity: 0,
        transition: { ...transition, delay: 0 },
    },
};

export const headTextAnimation = {
    initial: { x: 100, opacity: 0 },
    animate: { x: 0, opacity: 1 },
    transition: {
        type: "spring",
        damping: 5,
        stiffness: 40,
        restDelta: 0.001,
        duration: 0.3,
    },
};

export const headContentAnimation = {
    initial: { y: 100, opacity: 0 },
    animate: { y: 0, opacity: 1 },
    transition: {
        type: "spring",
        damping: 7,
        stiffness: 30,
        restDelta: 0.001,
        duration: 0.6,
        delay: 0.2,
        delayChildren: 0.2,
    },
};

export const headContainerAnimation = {
    initial: { x: -100, opacity: 0, transition: { ...transition, delay: 0.5 } },
    animate: { x: 0, opacity: 1, transition: { ...transition, delay: 0 } },
    exit: { x: -100, opacity: 0, transition: { ...transition, delay: 0 } },
};

export const typingAnimation = {
    initial: { width: 0 },
    animate: {
        width: "100%",
        transition: { duration: 1, delay: 0.5, type: "spring", stiffness: 50 },
    },
    exit: { width: 0, transition: { duration: 1, type: "spring", stiffness: 50 } },
};

export const bounceAnimation = {
    animate: {
        y: [0, -30, 0],
        transition: { duration: 0.5, ease: "easeOut" },
    },
};

export const scaleAnimation = {
    initial: { scale: 0, opacity: 0 },
    animate: { scale: 1, opacity: 1 },
    exit: { scale: 0, opacity: 0 },
    transition: { ...transition },
};