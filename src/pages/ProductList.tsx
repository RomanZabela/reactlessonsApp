import { useEffect, useState } from "react";
import { ErrorMessage, Loading } from "../shared/components";
import { useNavigate } from "react-router-dom";
import type { Product } from "../shared/types/product";
import { useGetProductList } from "../hooks/product";
import { useToastStore } from "../shared/stores/useToastStore";
import { useTranslation } from "react-i18next";

import { Button } from "primereact/button";
import { DataTable, type SortOrder } from "primereact/datatable";
import { Column } from "primereact/column";

import "./ProductList.css";

export const ProductList = () => {
    const { addToast } = useToastStore();
    const navigate = useNavigate();
    const [page, setPage] = useState(1);
    const [rows, setRows] = useState(10);
    const [expandedRows, setExpandedRows] = useState<any>(null);
    const [sortFiled, setSortField] = useState<string>('');
    const [sortOrder, setSortOrder] = useState<SortOrder>(0);

    const {t} = useTranslation(['product', 'common']);

    const sortDirection = sortOrder === 1 ? 'asc' : sortOrder === -1 ? 'desc' : undefined;

    const { data, error, isLoading } = useGetProductList(page, rows, sortFiled, sortDirection || '');

    useEffect(() => {
        if (error) {
            addToast(t('common:messages.error', { name: t('product:product.title') }), 'error', 3000);
        }
    }, [error, addToast, t]);

    const imageBodyTemplate = (rowData: Product) => {
        return <img src={rowData.thumbnail} alt={rowData.title} className="productImage" />;
    };

    const priceBodyTemplate = (rowData: Product) => {
        return <span>${rowData.price.toFixed(2)}</span>;
    };

    const actionBodyTemplate = (rowData: Product) => {
        const isExpanded = expandedRows && expandedRows[rowData.id];
        return (
            <Button 
                icon={isExpanded ? 'pi pi-eye-slash' : 'pi pi-eye'}
                rounded
                text
                severity="info"
                onClick={(e) => {
                    e.stopPropagation();
                    if (isExpanded) {
                        setExpandedRows(null);
                    } else {
                        setExpandedRows({ [rowData.id]: true });
                    }
                }}
                aria-label={t('product:button.viewDetails', { title: rowData.title })}
            />
        );
    };

    const rowExpansionTemplate = (rowData: Product) => {
        return (
            <div className="p-3">
                <h5>{t('product:table.description')}</h5>
                <p>{rowData.description}</p>
            </div>
        );
    };

    const onPageChange = (event: any) => {
        setPage(event.page + 1);
        setRows(event.rows);
        setExpandedRows(null);
    }

    const onSort = (event: any) => {
        setSortField(event.sortField as string);
        setSortOrder(event.sortOrder as SortOrder);
        setExpandedRows(null);
    };

    if (!data && isLoading) {
        return <Loading />;
    }

    if (error) {
        return <ErrorMessage message={t('common:messages.error', { name: t('product:product.title') })} />;
    }

    return(
        <div className="container">
            <h1 className="title">{t('product:product.title')}</h1>
            <DataTable
                value={data?.products}
                paginator
                rows={rows}
                rowsPerPageOptions={[5, 10, 25, 50]}
                totalRecords={data?.total}
                lazy
                first={(page - 1) * rows}
                onPage={onPageChange}
                onSort={onSort}
                sortField={sortFiled}
                sortOrder={sortOrder}
                tableStyle={{minWidth: '50rem'}}
                onRowClick={(e) => navigate(`/products/${e.data.id}`)}
                className="dataTable"
                loading={isLoading}
                expandedRows={expandedRows}
                onRowToggle={(e) => setExpandedRows(e.data)}
                rowExpansionTemplate={rowExpansionTemplate}
                dataKey="id"
                >
                <Column field="title" header={t('product:table.title')} sortable headerStyle={{ textAlign: 'center'}}></Column>
                <Column field="thumbnail" header={t('product:table.image')} body={imageBodyTemplate}></Column>
                <Column field="price" header={t('product:table.price')} body={priceBodyTemplate} sortable></Column>
                <Column field="category" header={t('product:table.category')} sortable></Column>
                <Column header={t('product:table.actions')} body={actionBodyTemplate}></Column>
            </DataTable>
        </div>
    )
}