import React, { useEffect, useState } from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { ICardSelect } from "../../../interfaces/ICardSelect.interface";
import styles from "./styles";

const CardSelect: React.FC<ICardSelect> = ({children, text, id, selected, funcId=()=>{}}) => { 

    return (
        <TouchableOpacity key={id} style={selected ? styles.cardSelected : styles.cardSelect} onPressOut={() => {funcId(id)}}>
            {children}
            <Text>{text}</Text>
        </TouchableOpacity>
    )
}

export default CardSelect;