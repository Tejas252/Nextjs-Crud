import { createContext, useState } from "react";

export const Message_data = createContext(null);

function Context({ children }) {
    const [students, setStudents] = useState();
  
    return (
      <Message_data.Provider value={{ students, setStudents }}>
        {children}
      </Message_data.Provider>
    );
  }

export default Context