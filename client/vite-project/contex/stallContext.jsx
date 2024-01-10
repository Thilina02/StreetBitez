import axios from 'axios';
import { createContext, useState, useEffect } from 'react';

export const StallContext = createContext({});

export function StallContextProvider({ children }){
    const[stall, setStall] = useState(null)
    useEffect(()   => {
        if(!stall) {
            axios.get('/stall/StallOwnerDashboard')
            .then(({data})  => {
                setStall(data)
            })
        }
    })
    return (
        <StallContext.Provider value={{ stall, setStall}}>
      {children}
    </StallContext.Provider>
    )
}