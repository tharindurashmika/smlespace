import React, { useState, useRef, useEffect } from 'react';

interface DraggableWidgetProps {
    id: string;
    uxpContext?: any;
    position?: { x: number; y: number };
    onresize?: (pos: { x: number; y: number }) => void;
    children: React.ReactNode;
}

const DraggableWidget: React.FC<DraggableWidgetProps> = ({ id, uxpContext, position, onresize, children }) => {
    const [pos, setPos] = useState(position || { x: 100, y: 100 });
    const dragging = useRef(false);
    const offset = useRef({ x: 0, y: 0 });

    const handleMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
        dragging.current = true;
        offset.current = {
            x: e.clientX - pos.x,
            y: e.clientY - pos.y,
        };
        document.body.style.cursor = 'grabbing';
    };

    const handleMouseMove = (e: MouseEvent) => {
        if (dragging.current) {
            setPos({
                x: e.clientX - offset.current.x,
                y: e.clientY - offset.current.y,
            });
        }
    };

    const handleMouseUp = () => {
        if (dragging.current) {
            dragging.current = false;
            document.body.style.cursor = 'default';
            onresize?.(pos); // notify parent of new position
        }
    };

    useEffect(() => {
        window.addEventListener('mousemove', handleMouseMove);
        window.addEventListener('mouseup', handleMouseUp);
        return () => {
            window.removeEventListener('mousemove', handleMouseMove);
            window.removeEventListener('mouseup', handleMouseUp);
        };
    }, []);

    useEffect(() => {
        if (position) setPos(position); // update if props.position changes
    }, [position]);

    return (
        <div
            id={id}
            onMouseDown={handleMouseDown}
            style={{
                position: 'absolute',
                top: pos.y,
                left: pos.x,
                cursor: 'grab',
                padding: '8px',
                backgroundColor: 'white',
                border: '1px solid #ccc',
                borderRadius: '8px',
                boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
                zIndex: 1000,
            }}
        >
            {children}
        </div>
    );
};

export default DraggableWidget;
