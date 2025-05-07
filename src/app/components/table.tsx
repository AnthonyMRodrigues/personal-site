'use client'
import React, { useState, useEffect, useMemo } from 'react';
import { FilterMatchMode, FilterOperator } from 'primereact/api';
import { DataTable, DataTableFilterMeta } from 'primereact/datatable';
import { Column, ColumnFilterElementTemplateOptions } from 'primereact/column';
import { InputText } from 'primereact/inputtext';
import { IconField } from 'primereact/iconfield';
import { InputIcon } from 'primereact/inputicon';
import { Button } from 'primereact/button';
import { MultiSelect, MultiSelectChangeEvent } from 'primereact/multiselect';
import { Slider, SliderChangeEvent } from 'primereact/slider';
import { useS3Data } from '../hooks/useContactForm';
import './table.css';

import { locale, addLocale, updateLocaleOption, updateLocaleOptions, localeOption, localeOptions } from 'primereact/api';

addLocale('pt', {
    firstDayOfWeek: 1,
    dayNames: ['domingo', 'segunda', 'terça', 'quarta', 'quinta', 'sexta', 'sábado'],
    dayNamesShort: ['dom', 'seg', 'ter', 'qua', 'qui', 'sex', 'sáb'],
    dayNamesMin: ['D', 'S', 'T', 'Q', 'Q', 'S', 'S'],
    monthNames: ['janeiro', 'fevereiro', 'março', 'abril', 'maio', 'junho', 'julho', 'agosto', 'setembro', 'outubro', 'novembro', 'dezembro'],
    monthNamesShort: ['jan', 'fev', 'mar', 'abr', 'mai', 'jun', 'jul', 'ago', 'set', 'out', 'nov', 'dez'],
    today: 'Hoje',
    clear: 'Limpar',
    apply: 'Aplicar',
    cancel: 'Cancelar'
});
locale('pt');

interface Perfume {
  id: number;
  marca: string;
  perfume: string;
  tamanho: number;
  tipo: string;
  sexo: string;
  preco_pix: number;
  preco_cartao: number;
}

const defaultFilters: DataTableFilterMeta = {
  global: { value: null, matchMode: FilterMatchMode.CONTAINS },
  marca: { value: null, matchMode: FilterMatchMode.CONTAINS, }  ,
  perfume: { value: null, matchMode: FilterMatchMode.CONTAINS, },
  tamanho: { value: null, matchMode: FilterMatchMode.BETWEEN },
  tipo: { value: null, matchMode: FilterMatchMode.IN },
  sexo: { value: null, matchMode: FilterMatchMode.IN },
  preco_pix: { value: null, matchMode: FilterMatchMode.BETWEEN },
  preco_cartao: { value: null, matchMode: FilterMatchMode.BETWEEN },
};

export default function PerfumesTable() {
    // const [perfumes, setPerfumes] = useState<Perfume[]>([]);
    const { data: perfumes, loading, error } = useS3Data();
    const [filters, setFilters] = useState<DataTableFilterMeta>(defaultFilters);
    const [globalFilterValue, setGlobalFilterValue] = useState<string>('');
    const [isMobile, setIsMobile] = useState(false);
    
    // Get unique values from perfumes data
    const sexos = useMemo(() => {
        if (!perfumes) return [];
        return Array.from(new Set(perfumes.map(p => p.sexo))).sort();
    }, [perfumes]);

    const tipos = useMemo(() => {
        if (!perfumes) return [];
        return Array.from(new Set(perfumes.map(p => p.tipo))).sort();
    }, [perfumes]);

    const maxPreco = useMemo(() => {
        if (!perfumes) return 1000;
        const maxValue = Math.max(...perfumes.map(p => p.preco_cartao));
        
        // Round up to the nearest:
        // - 50 if less than 1000
        // - 100 if less than 5000
        // - 500 if greater than 5000
        if (maxValue <= 1000) {
            return Math.ceil(maxValue / 50) * 50;
        } else if (maxValue <= 5000) {
            return Math.ceil(maxValue / 100) * 100;
        } else {
            return Math.ceil(maxValue / 500) * 500;
        }
    }, [perfumes]);

    const maxTamanho = useMemo(() => {
        if (!perfumes) return 1000;
        return Math.ceil(Math.max(...perfumes.map(p => p.tamanho)));
    }, [perfumes]);

    useEffect(() => {
        const checkMobile = () => {
            setIsMobile(window.innerWidth <= 768);
        };
        
        checkMobile();
        window.addEventListener('resize', checkMobile);
        
        return () => window.removeEventListener('resize', checkMobile);
    }, []);

    useEffect(() => {
        initFilters();
    }, []);

    const getPerfumes = (data: Perfume[]) => {
        return [...(data || [])].map((d) => {
            // @ts-ignore
            d.date = new Date(d.date);

            return d;
        });
    };

    const formatDate = (value: Date) => {
        return value.toLocaleDateString('en-US', {
            day: '2-digit',
            month: '2-digit',
            year: 'numeric'
        });
    };

    const formatCurrency = (value: number) => {
        return value.toLocaleString('en-US', { style: 'currency', currency: 'BRL' });
    };

    const clearFilter = () => {
        initFilters();
    };

    const onGlobalFilterChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        let _filters = { ...filters };

        // @ts-ignore
        _filters['global'].value = value;

        setFilters(_filters);
        setGlobalFilterValue(value);
    };

    const initFilters = () => {
        setFilters(defaultFilters);
        setGlobalFilterValue('');
    };


    const tipoFilterTemplate = (options: ColumnFilterElementTemplateOptions) => {
        return (
            <React.Fragment>
                <MultiSelect 
                    value={options.value} 
                    options={tipos} 
                    onChange={(e) => options.filterCallback(e.value)}
                    placeholder="Todos" 
                    className="p-column-filter"
                    display="chip"
                    showClear
                    filter
                />
            </React.Fragment>
        );
    };

    const sexoFilterTemplate = (options: ColumnFilterElementTemplateOptions) => {
        return (
            <React.Fragment>
                <MultiSelect 
                    value={options.value} 
                    options={sexos} 
                    onChange={(e) => options.filterCallback(e.value)}
                    placeholder="Todos" 
                    className="p-column-filter"
                    display="chip"
                    showClear
                    filter
                />
            </React.Fragment>
        );
    };

    const precoPixBodyTemplate = (rowData: Perfume) => {
        return formatCurrency(rowData.preco_pix);
    };

    const precoCartaoBodyTemplate = (rowData: Perfume) => {
        return formatCurrency(rowData.preco_cartao);
    };

    const tamanhoBodyTemplate = (rowData: Perfume) => {
        return rowData.tamanho + ' ml';
    };

    const priceFilterTemplate = (options: ColumnFilterElementTemplateOptions) => {
        return (
            <React.Fragment>
                <Slider 
                    value={options.value} 
                    onChange={(e: SliderChangeEvent) => options.filterCallback(e.value)} 
                    range 
                    className="m-3"
                    min={0}
                    max={maxPreco}
                    step={10}
                />
                <div className="flex justify-between w-full px-8">
                    <span className="text-site-secondary-color w-[120px]">{formatCurrency(options.value ? options.value[0] : 0)}</span>
                    <span className="text-site-secondary-color w-[120px] text-right">{formatCurrency(options.value ? options.value[1] : maxPreco)}</span>
                </div>
            </React.Fragment>
        );
    };

    const sizeFilterTemplate = (options: ColumnFilterElementTemplateOptions) => {
        return (
            <React.Fragment>
                <Slider 
                    value={options.value} 
                    onChange={(e: SliderChangeEvent) => options.filterCallback(e.value)} 
                    range 
                    className="m-3"
                    min={0}
                    max={maxTamanho}
                />
                <div className="flex justify-between w-full px-2">
                    <span className="text-site-secondary-color">{options.value ? options.value[0] : 0} ml</span>
                    <span className="text-site-secondary-color">{options.value ? options.value[1] : maxTamanho} ml</span>
                </div>
            </React.Fragment>
        );
    };

    const whatsappBodyTemplate = (rowData: Perfume) => {
        const message = `Olá! Gostaria de saber mais sobre o perfume:\n\n` +
            `Marca: ${rowData.marca}\n` +
            `Perfume: ${rowData.perfume}\n` +
            `Tamanho: ${rowData.tamanho}ml\n` +
            `Tipo: ${rowData.tipo}\n` +
            `Gênero: ${rowData.sexo}\n` +
            `Preço no PIX: ${formatCurrency(rowData.preco_pix)}\n` +
            `Preço no Cartão: ${formatCurrency(rowData.preco_cartao)}`;

        const whatsappUrl = `https://wa.me/+5511961932013?text=${encodeURIComponent(message)}`;

        return (
            <div className="flex justify-start">
                <Button 
                    icon="pi pi-whatsapp" 
                    className="p-button-rounded p-button-text p-button-md" 
                    onClick={() => window.open(whatsappUrl, '_blank')}
                    // style={{ padding: '0.25rem' }}
                />
            </div>
        );
    };

    const textFilterTemplate = (options: ColumnFilterElementTemplateOptions) => {
        return (
            <InputText
                value={options.value}
                onChange={(e) => options.filterCallback(e.target.value)}
                placeholder={options.field === 'marca' ? 'Buscar por marca' : 'Buscar por perfume'}
                className="w-100  text-md"
            />
        );
    };

    const renderHeader = () => {
        return (
            <div className="flex justify-between items-center">
                <div className="flex-1 flex justify-end">
                    <IconField iconPosition="right" className="p-input-icon-right">
                        <InputText 
                            value={globalFilterValue} 
                            onChange={onGlobalFilterChange} 
                            placeholder="Buscar" 
                            className="p-inputtext-lg w-full md:w-20rem bg-site-primary-color text-site-secondary-color placeholder:text-site-secondary-color"
                            style={{ 
                                fontSize: 'clamp(0.60rem, 1vw, 1rem)', 
                                padding: 'clamp(0.35rem, 1vw, 0.35rem)',
                                height: 'clamp(1.5rem, 2vw, 1rem)'
                            }}
                        />
                        <InputIcon className="pi pi-search text-site-secondary-color" style={{ fontSize: 'clamp(0.75rem, 2vw, 1rem)' }} />
                    </IconField>
                </div>
            </div>
        );
    };

    const header = renderHeader();
    return (
        <div className="card">
            <DataTable 
                value={perfumes} 
                paginator 
                showGridlines 
                rows={50} 
                loading={loading} 
                dataKey="id" 
                filters={filters} 
                globalFilterFields={['marca', 'perfume', 'tamanho', 'tipo', 'sexo', 'preco_pix', 'preco_cartao']} 
                header={header}
                emptyMessage="Nenhum perfume encontrado." 
                onFilter={(e) => setFilters(e.filters)}
                removableSort
                stripedRows
            >
                <Column 
                    field="marca" 
                    header="Marca" 
                    filter={!isMobile}
                    sortable 
                    filterElement={textFilterTemplate}
                    showFilterMatchModes={false} 
                    style={{ width: '7%' }}
                    filterField="marca"
                />
                <Column 
                    field="perfume" 
                    header="Perfume" 
                    filter={!isMobile}
                    sortable 
                    filterPlaceholder="Buscar por perfume" 
                    showFilterMatchModes={false}
                    filterField="perfume"
                    style={{ width: '7%' }}
                />
                <Column 
                    field="tamanho" 
                    header="Tamanho" 
                    filter={!isMobile}
                    sortable 
                    filterElement={sizeFilterTemplate} 
                    showFilterMatchModes={false} 
                    body={tamanhoBodyTemplate}
                    style={{ width: '6%' }}
                />
                <Column 
                    field="tipo" 
                    header="Tipo" 
                    filter={!isMobile}
                    sortable 
                    filterElement={tipoFilterTemplate} 
                    showFilterMatchModes={false} 
                    style={{ width: '4%' }}
                />
                <Column 
                    field="sexo" 
                    header="Sexo" 
                    filter={!isMobile}
                    sortable 
                    filterElement={sexoFilterTemplate} 
                    showFilterMatchModes={false} 
                    style={{ width: '5%' }}
                />
                <Column 
                    field="preco_pix" 
                    header="Preço Pix" 
                    filter={!isMobile}
                    sortable 
                    filterElement={priceFilterTemplate} 
                    showFilterMatchModes={false} 
                    body={precoPixBodyTemplate}
                    style={{ width: '6%' }}
                />
                <Column 
                    field="preco_cartao" 
                    header="Preço Até 12X" 
                    filter={!isMobile}
                    sortable 
                    filterElement={priceFilterTemplate} 
                    showFilterMatchModes={false} 
                    body={precoCartaoBodyTemplate}
                    style={{ width: '6%' }}
                />
                <Column 
                    header="Comprar" 
                    body={whatsappBodyTemplate} 
                    style={{ width: '6%'}} 
                />
            </DataTable>
        </div>
    );
}
        