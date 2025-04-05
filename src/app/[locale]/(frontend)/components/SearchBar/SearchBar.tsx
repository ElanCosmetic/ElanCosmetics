'use client'
import { motion } from "motion/react";
import { Search, X } from 'lucide-react';
import { useState, useRef, useEffect } from "react";
import { Input } from "@/components/ui/input";
import SearchResults from "./SearchResults";

const SearchBar = () => {
    const [visible, setVisible] = useState(false);
    const searchContentRef = useRef<HTMLDivElement>(null);
    const inputRef = useRef<HTMLInputElement>(null); // Ref for input
    const [word, setWord] = useState<string>("");

    const handleClickOutside = (event: MouseEvent) => {
        if (searchContentRef.current && !searchContentRef.current.contains(event.target as Node)) {
            setVisible(false);
        }
    };

    useEffect(() => {
        if (visible) {
            document.addEventListener("mousedown", handleClickOutside);
            inputRef.current?.focus(); // Focus the input when visible
        } else {
            document.removeEventListener("mousedown", handleClickOutside);
        }

        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [visible]);

    return (
        <>
            <Search strokeWidth={1.5} onClick={() => setVisible(true)} className="cursor-pointer" />
            {visible && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="fixed inset-0 z-50 bg-black/80 p-4"
                >
                    <div ref={searchContentRef} className="flex flex-col gap-2 md:gap-5 h-fit max-w-[1000px] w-full mx-auto">
                        <div className="bg-white rounded-md p-4 grid grid-cols-[1fr_auto] gap-4 items-center w-full">
                            <Input
                                type="text"
                                ref={inputRef} // Assign ref to input
                                value={word}
                                onChange={(e) => setWord(e.target.value)}
                                className="text-sm md:text-base"
                            />
                            <X className="cursor-pointer" onClick={() => setVisible(false)} />
                        </div>
                        {word.length > 2 && <SearchResults word={word} onItemClick={() => setVisible(false)} />}
                    </div>
                </motion.div>
            )}
        </>
    );
};

export default SearchBar;
