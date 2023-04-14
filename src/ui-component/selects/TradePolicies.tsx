import { Autocomplete, Checkbox, TextField } from '@mui/material';
import { useEffect, useMemo, useState } from 'react';
import { useIntl } from 'react-intl';
import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank';
import CheckBoxIcon from '@mui/icons-material/CheckBox';
import { getTradePolicies } from 'store/slices/product';
import { useDispatch, useSelector } from 'store';

export default function TradePoliciesSelect(merchantId: any, { onChange }: { onChange: () => void }) {
    const dispatch = useDispatch();

    const { merchantId: idMerchant } = merchantId;
    // hooks
    const intl = useIntl();
    const { tradePolicies } = useSelector((state) => state.product);

    useEffect(() => {
        dispatch(getTradePolicies());
        console.log(tradePolicies, 'POLICIES');
    }, [dispatch]);
    const icon = <CheckBoxOutlineBlankIcon fontSize="small" />;
    const checkedIcon = <CheckBoxIcon fontSize="small" />;

    const policiesList: any = useMemo(() => {
        console.log('merchant id', idMerchant);
        const filteredByMerchant = tradePolicies.find((item: any) => item.idMerchant === Number(idMerchant));
        console.log(filteredByMerchant);
        return filteredByMerchant?.tradePolicy.TradePolicies ?? [];
    }, [merchantId, tradePolicies]);

    // const [value, setValue] = useState<OptionType | null>(null);
    // const [inputValue, setInputValue] = useState<string>('');

    // const getOptions = useMemo(() => brandsList.map((item) => ({ label: item.name, id: item.idBrand })), [brandsList]);

    return (
        <Autocomplete
            multiple
            id="checkboxes-tags-demo"
            options={policiesList}
            disableCloseOnSelect
            onChange={(event, selectedPolicies) => {
                console.log(selectedPolicies);
            }}
            getOptionLabel={(option: any) => option.name}
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
