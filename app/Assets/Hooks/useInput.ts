import { useState } from "react";

export default function useInput(defaultValue: string){
    const [value, setValue] = useState(defaultValue)

    const onChange = (e: any) => {
        setValue(e.target.value)
    }

    return {
        value, onChange, setValue
    }
}