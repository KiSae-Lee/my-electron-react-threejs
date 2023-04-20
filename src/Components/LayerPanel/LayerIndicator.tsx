import React, { useRef, useState, useEffect } from 'react';

interface LayerIndicatorProps {
    title: string;
    activated: boolean;
    selected?: boolean;
    defaultColor?: string;
    selectedColor?: string;
    onLayerActivated?(value: string): void;
    onLayerSelected?(value: string): void;
    onNameChange?(currentName: string, value: string): boolean;
}

const LayerIndicator = ({
    title,
    activated,
    selected,
    selectedColor = '#4fc3f7',
    defaultColor = 'transparent',
    onLayerActivated,
    onLayerSelected,
    onNameChange,
}: LayerIndicatorProps) => {
    const formRef = useRef<HTMLFormElement>(null);
    const inputRef = useRef<HTMLInputElement>(null);
    const [isRename, setIsRename] = useState(false);
    const [input, setInput] = useState(title);

    let timer: NodeJS.Timeout;

    const handleDivClick = (event: React.MouseEvent<HTMLDivElement>) => {
        clearTimeout(timer);

        if (event.detail === 1) {
            timer = setTimeout(() => {
                if (onLayerSelected !== undefined) {
                    onLayerSelected(title);
                }
                // Single Click Here.
            }, 200);
        } else if (event.detail === 2) {
            // Double Click Here.
            if (onLayerActivated !== undefined) onLayerActivated(title);
        }
    };

    const handleInputClick = () => {
        setIsRename((current) => !current);
        inputRef.current?.select();
    };

    const onInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setInput(event.target.value);
    };

    const onLoseFocus = () => {
        setIsRename((current) => !current);
        window.getSelection()?.removeAllRanges();
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
        if (onNameChange !== undefined) {
            if (!onNameChange(title, input)) setInput(title);
        }
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
                display: 'flex',
                flexDirection: 'row',
                textAlign: 'left',
                backgroundColor: selected ? selectedColor : defaultColor,
                backgroundClip: 'content-box',
                padding: '3px',
            }}
            onClick={handleDivClick}
        >
            <input type="checkbox" checked={activated} readOnly={true} />
            <form
                ref={formRef}
                onSubmit={onSubmit}
                onClick={handleInputClick}
                style={{
                    width: '100px',
                }}
            >
                <input
                    ref={inputRef}
                    type="text"
                    value={input}
                    disabled={!isRename}
                    onChange={onInputChange}
                    onBlur={onLoseFocus}
                    style={{
                        padding: 0,
                        background: isRename ? 'white' : 'none',
                        border: isRename ? '1px solid #bababa' : 'none',
                        borderRadius: 0,
                        outline: 'none',
                        width: '100%',
                    }}
                />
            </form>
        </div>
    );
};

export default LayerIndicator;
