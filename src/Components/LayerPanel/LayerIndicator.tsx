import React, { useRef, useState, useEffect } from 'react';

interface LayerIndicatorProps {
    title: string;
    defaultColor?: string;
    clickedColor?: string;
}

const LayerIndicator = ({ title, defaultColor = 'transparent', clickedColor = 'white' }: LayerIndicatorProps) => {
    const formRef = useRef<HTMLFormElement>(null);
    const inputRef = useRef<HTMLInputElement>(null);
    const [isActive, setIsActive] = useState(false);
    const [isRename, setIsRename] = useState(false);
    const [input, setInput] = useState(title);

    let timer: NodeJS.Timeout;

    const onClick = (event: React.MouseEvent<HTMLDivElement>) => {
        clearTimeout(timer);

        if (event.detail === 1) {
            timer = setTimeout(() => {
                // Single Click Here.
                setIsActive((current) => !current);
            }, 200);
        } else if (event.detail === 2) {
            // Double Click Here.
            setIsRename((current) => !current);
            inputRef.current?.select();
        }
    };

    const onInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setInput(event.target.value);
    };

    const onLoseFocus = () => {
        setIsRename((current) => !current);
        if (formRef.current) {
            formRef.current.requestSubmit();
        }
    };

    useEffect(() => {
        if (isRename) {
            inputRef.current?.select();
        }
    }, [isRename]);

    const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        // if there is no table name {title},
        // Create Table {title}.
        // Return all tables to check.
        setIsActive(false);
        setIsRename(false);
        // Open the property panel.
        // else,
        // Alert message box shows up.
        // focus and select the input and input text.
        // induce to rename the layer.
    };

    return (
        <div
            style={{
                textAlign: 'left',
                backgroundColor: isActive ? clickedColor : defaultColor,
                backgroundClip: 'content-box',
                padding: '3px',
            }}
            onClick={onClick}
        >
            <form ref={formRef} onSubmit={onSubmit}>
                <input
                    ref={inputRef}
                    type="text"
                    value={input}
                    disabled={!isRename}
                    onChange={onInputChange}
                    onBlur={onLoseFocus}
                    style={{
                        padding: 0,
                        background: 'none',
                        border: isRename ? '1px solid #bababa' : 'none',
                        borderRadius: 0,
                        outline: 'none',
                        WebkitAppearance: 'none',
                        MozAppearance: 'none',
                        appearance: 'none',
                    }}
                />
            </form>
        </div>
    );
};

export default LayerIndicator;
