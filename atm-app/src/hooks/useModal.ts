import React from "react";

export const useModal = () => {
    const [modalIsVisible, setModalIsVisible] = React.useState(false);
    const toggleModalVisibility = () => setModalIsVisible(!modalIsVisible);

    return [modalIsVisible, toggleModalVisibility] as const;
};
