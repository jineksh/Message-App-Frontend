import {createContext, useContext, useState} from 'react';

const CreateWorkSpaceContext = createContext();

export const CreateWorkSpaceContextProvider = ({children}) => {
  const [isCreateWorkSpaceModalOpen, setIsCreateWorkSpaceModalOpen] = useState(false);

  

  return (
    <CreateWorkSpaceContext.Provider value={{ isCreateWorkSpaceModalOpen, setIsCreateWorkSpaceModalOpen }}>
      {children}
    </CreateWorkSpaceContext.Provider>
  );
}

export default CreateWorkSpaceContext;