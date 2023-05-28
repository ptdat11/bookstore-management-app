import React, { useState } from "react";
import { BasePropsPage } from "../../submodules/base-props/base-props";
import combineClassnames from "../../submodules/string-processing/combine-classname";
import PageLayout from "../../components/layout/page-layout/PageLayout";
import Input from "../../components/form-input/Input";
import AppConstraint from "../../interfaces/app-constraint";
import LocalStorage from "../../submodules/local-storage/local-storage";
import LargeButton from "../../components/button/LargeButton";
import { jsonFetch } from "../../submodules/networking/jsonFetch";
import { THEME } from "../../settings";
import { toast } from "react-toastify";
import Hr from "../../components/Hr";
import { useRecoilState, useRecoilValue } from "recoil";
import { apiUrlSelector, urlPrefixState } from "../../states/system-states";
import Collapse from "../../components/collapse/Collapse";

interface Props extends BasePropsPage {}

const SettingsPage = React.memo((props: Props) => {
    const [settings, setSettings] = useState<AppConstraint>(LocalStorage.get("settings") as AppConstraint);
    const [urlPrefix, setUrlPrefix] = useRecoilState(urlPrefixState);
    const bookApiUrl = useRecoilValue(apiUrlSelector("books"));
    const settingsApiUrl = useRecoilValue(apiUrlSelector("settings"));

    const handleClickSave = async (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        e.preventDefault();

        let response = await jsonFetch(settingsApiUrl, "POST", settings);
        switch (response.status) {
            case 201:
                LocalStorage.set("settings", settings);
                toast.success("Đã lưu thành công");
                return;
            default:
                toast.error("Đã có lỗi xảy ra");
        }
    }

    const handleBlurUrl = async (e: React.FocusEvent<HTMLInputElement>) => {
        toast.info("Đang kiểm tra kết nối. Vui lòng đợi giây lát", { toastId: "SETTINGS_VALIDATE_URL" });

        try {
            new URL(urlPrefix);
        } catch {
            toast.error("Hãy nhập URL hợp lệ", { toastId: "SETTINGS_INVALID_URL" });
            return;
        }

        try {
            await fetch(bookApiUrl, {
                method: "HEAD"
            })
        }
        catch {
            toast.error("Không thể kết nối đến máy chủ, hãy thử đổi sang URL khác");
            return;
        }

        toast.success("URL hợp lệ và có thể kết nối. Thay đổi thành công", { toastId: "SETTINGS_URL_SAVED" });
    };

    return (
        <PageLayout
            id={props.id}
            className={combineClassnames(
                props.className
            )}
            style={{...props.style}}
        >
            <div className="p-5 items-center">
                <Collapse
                    className="w-[97%] lg:w-10/12 mx-auto my-4"
                    title="Qui định" 
                    style={{
                        alignItems: "center"
                    }}
                >
                    <form
                        className="w-11/12 mb-3"
                    >
                        <Input
                            className={combineClassnames(
                                THEME.bgSemi,
                                "p-1 my-2 rounded block flex justify-between items-center"
                            )}
                            inputClassName="w-14"
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
                            inputClassName="w-14"
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
                            inputClassName="w-[5.5rem]"
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
                            inputClassName="w-14"
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
                </Collapse>

                <Collapse
                    className="w-[97%] lg:w-10/12 mx-auto my-4"
                    title="Nâng cao" 
                    style={{
                        alignItems: "center"
                    }}
                >
                    <Input
                        className={combineClassnames(
                            THEME.bgSemi,
                            " w-11/12 p-1 my-2 rounded block flex justify-between items-center"
                        )}
                        inputClassName="w-56"
                        label="URL máy chủ"
                        type="text"
                        value={urlPrefix}
                        placeholder="https://qlns.dipicorp.com"
                        onChange={(e) => {
                            setUrlPrefix(e.target.value);
                        }}
                        onBlur={handleBlurUrl}
                    />
                </Collapse>
            </div>
        </PageLayout>
    );
});

export default SettingsPage;