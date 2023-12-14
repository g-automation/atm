import { useCallback, useState } from "react";

export const useModal = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const toggleModalVisibility = useCallback(
    () => setIsModalVisible(!isModalVisible),
    [isModalVisible]
  );

  return { isModalVisible, toggleModalVisibility };
};
