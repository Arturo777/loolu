import { Autocomplete, Checkbox, TextField } from '@mui/material';
import { useEffect, useState } from 'react';
import { useIntl } from 'react-intl';
import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank';
import CheckBoxIcon from '@mui/icons-material/CheckBox';

export default function TradePoliciesSelect({ onChange }: { onChange: () => void }) {
    // hooks
    const intl = useIntl();
    const policies = [
        { isActive: true, idMerchant: 1, idPolicy: 1245, name: 'Exportaciones' },
        { isActive: true, idMerchant: 2, idPolicy: 1248, name: 'Importaciones' },
        { isActive: false, idMerchant: 2, idPolicy: 1250, name: 'Ventas' }
    ];

    const icon = <CheckBoxOutlineBlankIcon fontSize="small" />;
    const checkedIcon = <CheckBoxIcon fontSize="small" />;

    // const [value, setValue] = useState<OptionType | null>(null);
    // const [inputValue, setInputValue] = useState<string>('');

    // useEffect(() => {
    //     console.log('initialValue', initialValue);
    //     if (initialValue) {
    //         const searchObject = brandsList.find((item) => item.idBrand === initialValue);

    //         console.log(searchObject);

    //         if (searchObject) {
    //             setValue({
    //                 id: initialValue,
    //                 label: searchObject.name
    //             });
    //         }
    //     }
    // }, [brandsList, initialValue]);

    // const getOptions = useMemo(() => brandsList.map((item) => ({ label: item.name, id: item.idBrand })), [brandsList]);

    return (
        <Autocomplete
            multiple
            id="checkboxes-tags-demo"
            options={policies}
            disableCloseOnSelect
            getOptionLabel={(option) => option.name}
            renderOption={(props, option, { selected }) => (
                <li {...props}>
                    <Checkbox icon={icon} checkedIcon={checkedIcon} style={{ marginRight: 8 }} checked={selected} />
                    {option.name}
                </li>
            )}
            style={{ width: 500 }}
            renderInput={(params) => (
                <TextField
                    sx={{ width: '350px' }}
                    {...params}
                    label={intl.formatMessage({ id: 'trade_policies' })}
                    placeholder={intl.formatMessage({ id: 'trade_policies' })}
                />
            )}
        />
    );
}
