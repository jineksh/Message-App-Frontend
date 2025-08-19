import { createContext, useContext, useState } from 'react';

 const WorkspacePreferenceContext = createContext();



export const WorkspacePreferenceContextProvider = ({ children }) => {
    const [isWorkspacePreferenceModalOpen, setIsWorkspacePreferenceModalOpen] = useState(false);



    const [intialValue, setIntialValue] = useState(null);

    const [workspace,setworkspace] = useState(null);



    return (
        <WorkspacePreferenceContext.Provider value={{
            isWorkspacePreferenceModalOpen,
            setIsWorkspacePreferenceModalOpen,
            intialValue,
            setIntialValue,
            workspace,
            setworkspace
        }}>
            {children}
        </WorkspacePreferenceContext.Provider>
    );
}

export default WorkspacePreferenceContext;