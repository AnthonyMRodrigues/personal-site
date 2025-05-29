'use client'
import React, { useState, useEffect, useMemo } from 'react';
import { FilterMatchMode } from 'primereact/api';
import { DataTable, DataTableFilterMeta } from 'primereact/datatable';
import { Column, ColumnFilterElementTemplateOptions } from 'primereact/column';
import { InputText } from 'primereact/inputtext';
import { IconField } from 'primereact/iconfield';
import { InputIcon } from 'primereact/inputicon';
import { Button } from 'primereact/button';
import { ListBox } from 'primereact/listbox';
import { Slider, SliderChangeEvent } from 'primereact/slider';
import { useS3Data } from '../hooks/useContactForm';
import { useDebounce } from 'primereact/hooks';

import './table.css';

import { locale, addLocale } from 'primereact/api';

addLocale('pt', {
    firstDayOfWeek: 1,
    dayNames: ['domingo', 'segunda', 'terça', 'quarta', 'quinta', 'sexta', 'sábado'],
    dayNamesShort: ['dom', 'seg', 'ter', 'qua', 'qui', 'sex', 'sáb'],
    dayNamesMin: ['D', 'S', 'T', 'Q', 'Q', 'S', 'S'],
    monthNames: ['janeiro', 'fevereiro', 'março', 'abril', 'maio', 'junho', 'julho', 'agosto', 'setembro', 'outubro', 'novembro', 'dezembro'],
    monthNamesShort: ['jan', 'fev', 'mar', 'abr', 'mai', 'jun', 'jul', 'ago', 'set', 'out', 'nov', 'dez'],
    today: 'HOJE',
    clear: 'LIMPAR',
    apply: 'APLICAR',
    cancel: 'CANCELAR'
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

// Add this CSS class definition right after the imports
const headerClassName = (isActive: boolean) => 
    `bg-site-primary-color text-white ${isActive ? 'column-active' : ''} filter-header`;

export default function PerfumesTable() {
    const { data: perfumes, loading, error } = useS3Data();
    const [filters, setFilters] = useState<DataTableFilterMeta>(defaultFilters);
    const [globalFilterValue, setGlobalFilterValue] = useState<string>('');
    const [isMobile, setIsMobile] = useState(false);
    const [initialLoad, setInitialLoad] = useState(true);
    const [activeFilters, setActiveFilters] = useState<Record<string, boolean>>({});
    
    // For text filter debouncing
    const [localFilterValues, setLocalFilterValues] = useState({});
    const [debouncedFilterValues] = useDebounce(localFilterValues, 500);

    // For tracking if filters are pending application
    const [pendingFilters, setPendingFilters] = useState({});
    
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

    const minPrecoPix = 100;

    const maxTamanho = useMemo(() => {
        if (!perfumes) return 1000;
        return Math.ceil(Math.max(...perfumes.map(p => p.tamanho)));
    }, [perfumes]);

    const minTamanho = 0;

    useEffect(() => {
        // Only update actual filters when debounced values change
        if (Object.keys(debouncedFilterValues).length > 0) {
          const newFilters = { ...filters };
          
          Object.entries(debouncedFilterValues).forEach(([field, value]) => {
            if (newFilters[field]) {
              // @ts-ignore
              newFilters[field].value = value;
            }
          });
          
          setFilters(newFilters);
        }
      }, [debouncedFilterValues]);
      

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
        if (initialLoad && tipos.length > 0 && sexos.length > 0) {
            setFilters(prevFilters => ({
                ...prevFilters,
                tipo: { value: tipos, matchMode: FilterMatchMode.IN },
                sexo: { value: sexos, matchMode: FilterMatchMode.IN }
            }));
            setInitialLoad(false);
        }
    }, [tipos, sexos, initialLoad]);

    useEffect(() => {
        setActiveFilters({
            // @ts-ignore
            tipo: filters.tipo?.value?.length > 0 && filters.tipo?.value?.length < tipos.length,
            // @ts-ignore
            sexo: filters.sexo?.value?.length > 0 && filters.sexo?.value?.length < sexos.length,
            // @ts-ignore
            tamanho: filters.tamanho?.value?.length === 2 && (filters.tamanho?.value[0] !== minTamanho || filters.tamanho?.value[1] !== maxTamanho),
            // @ts-ignore
            preco_pix: filters.preco_pix?.value?.length === 2 && (filters.preco_pix?.value[0] !== minPrecoPix || filters.preco_pix?.value[1] !== maxPrecoPix),
            // @ts-ignore
            preco_cartao: filters.preco_cartao?.value?.length === 2 && (filters.preco_cartao?.value[0] !== minPrecoCartao || filters.preco_cartao?.value[1] !== maxPrecoCartao),
            // @ts-ignore
            marca: !!filters.marca?.value,
            // @ts-ignore
            perfume: !!filters.perfume?.value
        });
    }, [filters, tipos.length, sexos.length, minTamanho, maxTamanho, minPrecoPix, maxPrecoPix, minPrecoCartao, maxPrecoCartao]);

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
        const handleFocus = (event: React.FocusEvent<HTMLInputElement>) => {
            // For iOS devices
            if (/iPhone|iPad|iPod/.test(navigator.userAgent)) {
              setTimeout(() => {
                // Get the position of the input field
                const rect = event.target.getBoundingClientRect();
                const elementTop = rect.top + window.scrollY;
                
                // Scroll to position the input field in the upper portion of the screen
                window.scrollTo({
                  top: elementTop - 200,
                  behavior: 'smooth'
                });
              }, 300); // Delay to wait for keyboard to appear
            }
          };

        return (
                <InputText
                    value={options.value || ''}
                    onChange={(e) => options.filterCallback(e.target.value)}
                    placeholder={`BUSCAR POR ${options.field.toUpperCase()}`}
                    className="w-100 text-md text-center [&::placeholder]:text-sm"
                    onFocus={handleFocus}
                />
        );
    };
      

    const tipoFilterTemplate = (options: ColumnFilterElementTemplateOptions) => {
        const itemTemplate = (option: string) => {
            const isSelected = options.value ? options.value.includes(option) : true;
            return (
                <div className={`flex items-center px-2 h-8 ${isSelected ? 'bg-site-primary-color text-white rounded' : ''}`}>
                    {isSelected && <i className="pi pi-check mr-2"></i>}
                    <span className="flex-1 text-center">{option}</span>
                </div>
            );
        };
        const value = options.value || tipos;
        return (
            <React.Fragment>
                <ListBox 
                    value={value} 
                    options={tipos} 
                    onChange={(e) => options.filterCallback(e.value)}
                    className="w-full text-site-secondary-color"
                    multiple
                    itemTemplate={itemTemplate}
                    listClassName="p-0 [&>li]:py-0"
                />
            </React.Fragment>
        );
    };

    const sexoFilterTemplate = (options: ColumnFilterElementTemplateOptions) => {
        const itemTemplate = (option: string) => {
            const isSelected = options.value ? options.value.includes(option) : true;
            return (
                <div className={`flex items-center px-2 h-8 ${isSelected ? 'bg-site-primary-color text-white rounded' : ''}`}>
                    {isSelected && <i className="pi pi-check mr-2"></i>}
                    <span className="flex-1 text-center">{option}</span>
                </div>
            );
        };
        const value = options.value || sexos;
        return (
            <React.Fragment>
                <ListBox 
                    value={value} 
                    options={sexos} 
                    onChange={(e) => options.filterCallback(e.value)}
                    className="w-full text-site-secondary-color"
                    multiple
                    itemTemplate={itemTemplate}
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
        const minPreco = 100;
        return (
            <React.Fragment>
                <Slider 
                    value={options.value} 
                    onChange={(e: SliderChangeEvent) => options.filterCallback(e.value)} 
                    range 
                    className="m-3"
                    min={minPreco}
                    max={maxPreco}
                    step={100}
                />
                <div className="flex justify-between w-full">
                    <span className="text-site-secondary-color w-[120px]">{formatCurrency(options.value ? options.value[0] : minPreco)}</span>
                    <span className="text-site-secondary-color w-[120px]">{formatCurrency(options.value ? options.value[1] : maxPreco)}</span>
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
                    step={20}
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
                rows={100} 
                paginator 
                loading={loading} 
                dataKey="id" 
                filters={filters} 
                globalFilterFields={['marca', 'perfume']} 
                header={header}
                emptyMessage="NENHUM PERFUME ENCONTRADO." 
                onFilter={(e) => setFilters(e.filters)}
                removableSort
                stripedRows
                filterDisplay="menu"
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
                    headerClassName={headerClassName(activeFilters.marca)}
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
                    headerClassName={headerClassName(activeFilters.perfume)}
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
                    headerClassName={`${headerClassName(activeFilters.tamanho)} remove-filter-margin`}
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
                    headerClassName={headerClassName(activeFilters.tipo)}
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
                    headerClassName={headerClassName(activeFilters.sexo)}
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
                    // align="center"
                    headerClassName={headerClassName(activeFilters.preco_pix)}
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
                    headerClassName={headerClassName(activeFilters.preco_cartao)}
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
        