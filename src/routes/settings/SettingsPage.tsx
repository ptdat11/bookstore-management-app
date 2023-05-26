import React, { useState } from "react";
import { BasePropsPage } from "../../submodules/base-props/base-props";
import combineClassnames from "../../submodules/string-processing/combine-classname";
import PageLayout from "../../components/layout/page-layout/PageLayout";
import Input from "../../components/form-input/Input";
import AppConstraint from "../../interfaces/app-constraint";
import LocalStorage from "../../submodules/local-storage/local-storage";
import LargeButton from "../../components/button/LargeButton";
import { jsonFetch } from "../../submodules/networking/jsonFetch";
import { THEME, urlPrefix } from "../../settings";
import { toast } from "react-toastify";
import Hr from "../../components/Hr";

interface Props extends BasePropsPage {}

const SettingsPage = React.memo((props: Props) => {
    const [settings, setSettings] = useState<AppConstraint>(LocalStorage.get("settings") as AppConstraint);

    const handleClickSave = async (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        e.preventDefault();

        let response = await jsonFetch(`${urlPrefix}/api/settings/`, "POST", settings);
        switch (response.status) {
            case 201:
                LocalStorage.set("settings", settings);
                toast.success("Đã lưu thành công");
                return;
            default:
                toast.error("Đã có lỗi xảy ra");
        }
    }

    return (
        <PageLayout
            id={props.id}
            className={combineClassnames(
                props.className
            )}
            style={{...props.style}}
        >
            <div className="flex flex-col p-5 items-center">
                <form
                    className="w-11/12 mb-3"
                >
                    <Input
                        className={combineClassnames(
                            THEME.bgSemi,
                            "p-1 my-2 rounded block flex justify-between items-center"
                        )}
                        inputClassName="w-[3.5rem]"
                        label="LƯỢNG NHẬP TỐI THIỂU"
                        type="number"
                        value={settings.MinImport}
                        onChange={(e) => {
                            setSettings({
                                ...settings,
                                MinImport: Number(e.target.value)
                            });
                        }}
                    />

                    <Input
                        className={combineClassnames(
                            THEME.bgSemi,
                            "p-1 my-2 rounded block flex justify-between items-center"
                        )}
                        inputClassName="w-[3.5rem]"
                        label="TỒN TỐI ĐA TRƯỚC KHI NHẬP"
                        type="number"
                        value={settings.AmountNeedImport}
                        onChange={(e) => {
                            setSettings({
                                ...settings,
                                AmountNeedImport: Number(e.target.value)
                            });
                        }}
                    />

                    <Input
                        className={combineClassnames(
                            THEME.bgSemi,
                            "p-1 my-2 rounded block flex justify-between items-center"
                        )}
                        inputClassName="w-[3.5rem]"
                        label="TIỀN NỢ TỐI ĐA (VNĐ)"
                        type="number"
                        value={settings.MaxDebt}
                        onChange={(e) => {
                            setSettings({
                                ...settings,
                                MaxDebt: Number(e.target.value)
                            });
                        }}
                    />

                    <Input 
                        className={combineClassnames(
                            THEME.bgSemi,
                            "p-1 my-2 rounded block flex justify-between items-center"
                        )}
                        inputClassName="w-[3.5rem]"
                        label="TỒN TỐI THIỂU SAU KHI BÁN"
                        type="number"
                        value={settings.BookAmountAfter}
                        onChange={(e) => {
                            setSettings({
                                ...settings,
                                BookAmountAfter: Number(e.target.value)
                            });
                        }}
                    />

                    <Input 
                        className={combineClassnames(
                            THEME.bgSemi,
                            "p-1 my-2 rounded block flex justify-between items-center"
                        )}
                        inputClassName="scale-150"
                        label="SỐ TIỀN THU KHÔNG VƯỢT QUÁ SỐ TIỀN NỢ"
                        type="checkbox"
                        checked={settings.PaidNotGreaterThanDebt}
                        onChange={(e) => {
                            setSettings({
                                ...settings,
                                PaidNotGreaterThanDebt: e.target.checked
                            });
                        }}
                    />
                </form>
                
                <Hr />
                <LargeButton 
                    className="mx-auto"
                    onClick={handleClickSave}
                    >
                    LƯU
                </LargeButton>
            </div>
        </PageLayout>
    );
});

export default SettingsPage;