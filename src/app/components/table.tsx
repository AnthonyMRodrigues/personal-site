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

import { locale, addLocale } from 'primereact/api';

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
    const [initialLoad, setInitialLoad] = useState(true);
    
    // Get unique values from perfumes data
    const sexos = useMemo(() => {
        if (!perfumes) return [];
        return Array.from(new Set(perfumes.map(p => p.sexo))).sort();
    }, [perfumes]);

    const tipos = useMemo(() => {
        if (!perfumes) return [];
        return Array.from(new Set(perfumes.map(p => p.tipo))).sort();
    }, [perfumes]);

    const maxPrecoCartao = useMemo(() => {
        if (!perfumes) return 1000;
        return Math.max(...perfumes.map(p => p.preco_cartao));
    }, [perfumes]);

    const minPrecoCartao = useMemo(() => {
        if (!perfumes) return 0;
        return Math.min(...perfumes.map(p => p.preco_cartao));
    }, [perfumes]);

    const maxPrecoPix = useMemo(() => {
        if (!perfumes) return 1000;
        return Math.max(...perfumes.map(p => p.preco_pix));
    }, [perfumes]);

    const minPrecoPix = useMemo(() => {
        if (!perfumes) return 0;
        return Math.min(...perfumes.map(p => p.preco_pix));
    }, [perfumes]);

    const maxTamanho = useMemo(() => {
        if (!perfumes) return 1000;
        return Math.ceil(Math.max(...perfumes.map(p => p.tamanho)));
    }, [perfumes]);

    const minTamanho = useMemo(() => {
        if (!perfumes) return 0;
        return Math.ceil(Math.min(...perfumes.map(p => p.tamanho)));
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

    useEffect(() => {
        if (initialLoad && tipos.length > 0) {
            setFilters(prevFilters => ({
                ...prevFilters,
                tipo: { value: tipos, matchMode: FilterMatchMode.IN }
            }));
            setInitialLoad(false);
        }
    }, [tipos, initialLoad]);

    const formatCurrency = (value: number) => {
        return value.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
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

    const handleFilterOpen = (filterType: string) => {
        setTimeout(() => {
            const filterElement = document.querySelector(filterType === 'multiselect' ? '.p-multiselect-panel' : '.p-column-filter-overlay');
            const filterButton = document.querySelector('.p-column-filter-menu-button');
            
            if (filterElement && filterButton) {
                const buttonRect = filterButton.getBoundingClientRect();
                const viewportHeight = window.innerHeight;
                const spaceAbove = buttonRect.top;
                const spaceBelow = viewportHeight - buttonRect.bottom;
                const filterHeight = 300; // Approximate filter height

                // If there's more space above than below, or not enough space below
                if (spaceAbove > spaceBelow || spaceBelow < filterHeight) {
                    const scrollAmount = buttonRect.top - 100; // Position 100px from top
                    window.scrollBy({
                        top: scrollAmount,
                        behavior: 'smooth'
                    });
                }
            }
        }, 100);
    };

    const textFilterTemplate = (options: ColumnFilterElementTemplateOptions) => {
        return (
            <React.Fragment>
                <InputText
                    value={options.value}
                    onChange={(e) => options.filterCallback(e.target.value)}
                    placeholder={options.field === 'marca' ? 'BUSCAR POR MARCA' : 'BUSCAR POR PERFUME'}
                    className="w-100 text-md"
                    // onFocus={() => handleFilterOpen('text')}
                />
            </React.Fragment>
        );
    };

    const tipoFilterTemplate = (options: ColumnFilterElementTemplateOptions) => {
        return (
            <React.Fragment>
                <MultiSelect 
                    value={options.value || tipos} 
                    options={tipos} 
                    onChange={(e) => options.filterCallback(e.value)}
                    placeholder="Todos" 
                    className="w-full text-site-secondary-color"
                    showClear
                    // onShow={() => handleFilterOpen('multiselect')}
                    panelClassName="text-site-secondary-color"
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
                    className="w-full text-site-secondary-color"
                    showClear
                    // onShow={() => handleFilterOpen('multiselect')}
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

    const priceFilterTemplate = (options: ColumnFilterElementTemplateOptions) => {
        const maxPreco = options.field === 'preco_cartao' ? maxPrecoCartao : maxPrecoPix;
        const minPreco = options.field === 'preco_cartao' ? minPrecoCartao : minPrecoPix;
        return (
            <React.Fragment>
                <Slider 
                    value={options.value} 
                    onChange={(e: SliderChangeEvent) => options.filterCallback(e.value)} 
                    range 
                    className="m-3"
                    min={minPreco}
                    max={maxPreco}
                    step={10}
                    // onFocus={() => handleFilterOpen('slider')}
                />
                <div className="flex justify-between w-full px-8">
                    <span className="text-site-secondary-color w-[120px]">{formatCurrency(options.value ? options.value[0] : minPreco)}</span>
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
                    min={minTamanho}
                    max={maxTamanho}
                    // onFocus={() => handleFilterOpen('slider')}
                />
                <div className="flex justify-between w-full px-2">
                    <span className="text-site-secondary-color">{options.value ? options.value[0] : minTamanho} ml</span>
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
        const whatsappUrl = `https://wa.me/+5511969058377?text=${encodeURIComponent(message)}`;

        return (
            <div className="flex justify-center">
                <Button 
                    icon="pi pi-whatsapp" 
                    className="p-button-rounded p-button-text p-button-lg" 
                    onClick={() => window.open(whatsappUrl, '_blank')}
                />
            </div>
        );
    };

    const renderHeader = () => {
        return (
            <div className="flex justify-between items-center">
                <div className="flex-1 flex justify-center">
                    <IconField iconPosition="right" className="p-input-icon-right w-2/3">
                        <InputText 
                            value={globalFilterValue} 
                            onChange={onGlobalFilterChange} 
                            placeholder="BUSCAR" 
                            className="p-inputtext-lg w-full bg-site-primary-color text-site-secondary-color placeholder:text-site-secondary-color"
                            style={{ 
                                fontSize: '1.44rem',
                                padding: '1.2rem',
                                height: '4rem',
                                width: '100%'
                            }}
                        />
                        <InputIcon className="pi pi-search text-site-secondary-color" style={{ fontSize: '1.8rem' }} />
                    </IconField>
                </div>
            </div>
        );
    };

    const header = renderHeader();
    return (
        <div className="card bg-[#f1d0a4] font-futura">
            <DataTable 
                value={perfumes} 
                showGridlines 
                rows={50} 
                paginator 
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
                    header="MARCA" 
                    filter
                    sortable 
                    filterElement={textFilterTemplate}
                    showFilterMatchModes={false} 
                    style={{ width: '7%' }}
                    filterField="marca"
                    align="center"
                    // bodyClassName="break-word-col"
                    headerClassName="bg-site-primary-color text-white"
                />
                <Column 
                    field="perfume" 
                    header="PERFUME" 
                    filter
                    sortable 
                    filterPlaceholder="Buscar por perfume" 
                    showFilterMatchModes={false}
                    filterElement={textFilterTemplate}
                    filterField="perfume"
                    style={{ width: '8%' }}
                    align="center"
                    bodyClassName="break-word-col"
                    headerClassName="bg-site-primary-color text-white"
                />
                <Column 
                    field="tamanho" 
                    header="ML" 
                    filter
                    sortable 
                    filterElement={sizeFilterTemplate} 
                    showFilterMatchModes={false} 
                    style={{ width: '4%' }}
                    align="center"
                    headerClassName="bg-site-primary-color text-white remove-filter-margin"
                />
                <Column 
                    field="tipo" 
                    header="TIPO" 
                    filter
                    sortable 
                    filterElement={tipoFilterTemplate} 
                    showFilterMatchModes={false} 
                    style={{ width: '5%' }}
                    align="center"
                    headerClassName="bg-site-primary-color text-white"
                />
                <Column 
                    field="sexo" 
                    header="SEXO" 
                    filter
                    sortable 
                    filterElement={sexoFilterTemplate} 
                    showFilterMatchModes={false} 
                    style={{ width: '5%' }}
                    align="center"
                    headerClassName="bg-site-primary-color text-white"
                />
                <Column 
                    field="preco_pix" 
                    header="PREÇO PIX" 
                    filter
                    sortable 
                    filterElement={priceFilterTemplate} 
                    showFilterMatchModes={false} 
                    body={precoPixBodyTemplate}
                    style={{ width: '6%' }}
                    align="center"
                    headerClassName="bg-site-primary-color text-white"
                />
                <Column 
                    field="preco_cartao" 
                    header="PREÇO ATÉ 12X" 
                    filter
                    sortable 
                    filterElement={priceFilterTemplate} 
                    showFilterMatchModes={false} 
                    body={precoCartaoBodyTemplate}
                    style={{ width: '6%' }}
                    align="center"
                    headerClassName="bg-site-primary-color text-white"
                />
                {!isMobile && (
                    <Column 
                        header="COMPRAR" 
                        body={whatsappBodyTemplate} 
                        style={{ width: '6%'}} 
                        align="center"
                        headerClassName="bg-site-primary-color text-white"
                    />
                )}
            </DataTable>
        </div>
    );
}
        