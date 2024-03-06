import { useState } from "react";
import useInput from "./useInput";

export default function useInputLimit(min: number = 0, max?: number) {

    const [value, setValue] = useState(min)

    const onBlur = (e: any) => {
        const preValue = parseInt(e.target.value)
        if (preValue < min)
            setValue(min)
        if (max && preValue > max)
            setValue(max)
    }

    const onChange = (e: any) => {
        setValue(e.target.value)
    }

    return {
        value, min, max, onBlur, onChange
    }
}