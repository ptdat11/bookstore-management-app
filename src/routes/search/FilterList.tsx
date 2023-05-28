import React, { useEffect, useRef } from "react";
import { BaseProps } from "../../submodules/base-props/base-props";
import CardList from "../../components/card-list/CardList";
import Card from "../../components/card-list/Card";
import CardRef from "../../interfaces/refs/card-ref";
import { RecoilState, useRecoilState } from "recoil";
import { toast } from "react-toastify";
import { THEME } from "../../settings";

interface Props extends BaseProps {
    title?: string,
    recoilState: RecoilState<string[]>
}

const FilterList: React.FC<Props> = React.memo((props) => {
    const [filterList, setFilterList] = useRecoilState(props.recoilState);
    const lastCardRef = useRef<CardRef>(null);

    useEffect(() => {
        lastCardRef.current?.focus();
    }, [filterList.length]);

    const deleteCriteria = (criterion: string[], index: number) => {
        return criterion.filter((cri, i) => i !== index);
    };

    const addCriteria = (criterion: string[], newValue: string) => {
        return [
            ...criterion,
            newValue
        ];
    };

    const changeCriteria = (criterion: string[], index: number, newValue: string) => {
        return criterion.map((cri, i) => i === index ? newValue : cri);
    }
    
    return (
        <CardList
            title={props.title}
            className={props.className}
            style={{...props.style}}
            onClickPlus={() => {
                if (filterList.length > 0 && filterList.at(-1) === "") {
                    toast.warning("Hãy điền thông tin còn trống trước khi thêm", { toastId: `FILTER_EMPTY_INPUT_${props.title}` })
                    return;
                }

                const newCate = addCriteria(filterList, "");
                setFilterList(newCate);
            }}
        >
            {filterList.map((item, index) => 
                    <Card
                        key={index}
                        className={THEME.text}
                        ref={lastCardRef}
                        value={item}
                        onClickX={(e) => {
                            const newList = deleteCriteria(filterList, index);
                            setFilterList(newList)}
                        }
                        onChange={(e) => {
                            const newList = changeCriteria(filterList, index, e.target.value);
                            setFilterList(newList);
                        }}
                    />
                )}
        </CardList>
    )
});

export default FilterList;