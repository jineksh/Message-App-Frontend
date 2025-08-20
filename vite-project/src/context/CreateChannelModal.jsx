import {createContext, useContext, useState} from 'react';

const CreateChannelContext = createContext();

export const CreateChannelContextProvider = ({children}) => {
  const [isCreateChannelModalOpen, setIsCreateChannelModalOpen] = useState(false);

  

  return (
    <CreateChannelContext.Provider value={{ isCreateChannelModalOpen, setIsCreateChannelModalOpen }}>
      {children}
    </CreateChannelContext.Provider>
  );
}

export default CreateChannelContext;