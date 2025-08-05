//React
import {
    useState,
    useEffect
} from 'react';


/**
 * useInput
 * 
 * @returns 
 */
function useInput() {
    const [inputValue, setInputValue] = useState<string>("");

    useEffect(() => {
        let intervalId: number | null = null;
        let observer: MutationObserver | null = null;

        const trySetupObserver = () => {
            const hiddenInput = document.getElementById('keyboard_value') as HTMLInputElement | null;

            if (hiddenInput) {
                if (intervalId) clearInterval(intervalId);

                observer = new MutationObserver(() => {
                    setInputValue(hiddenInput.value);
                });

                observer.observe(hiddenInput, {
                    attributes: true,
                    attributeFilter: ['value'],
                });

                // Beállítjuk az aktuális értéket
                setInputValue(hiddenInput.value);
            }
        };

        trySetupObserver();

        if (!observer) {
            intervalId = setInterval(trySetupObserver, 500);
        }

        return () => {
            if (intervalId) clearInterval(intervalId);
            if (observer) observer.disconnect();
        };
    }, []);


    /**
     * resetValue
     * 
     */
    const resetValue = () => {
        const hiddenInput = document.getElementById('keyboard_value') as HTMLInputElement | null;
        if (hiddenInput) {
            hiddenInput.value = "";
            setInputValue("");
        }
    };


    /**
     * setValue
     * 
     * @param val 
     */
    const setValue = (val: string) => {
        const hiddenInput = document.getElementById('keyboard_value') as HTMLInputElement | null;
        if (hiddenInput) {
            hiddenInput.value = val;
            setInputValue(val);
        }
    }

    return {
        inputValue,
        resetValue,
        setValue
    };
}

export default useInput;