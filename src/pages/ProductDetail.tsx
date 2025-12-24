import { useParams } from "react-router-dom";
import { ErrorMessage, Loading } from "../shared/components";
import { useGetProductById } from "../hooks/product";
import { useTranslation } from "react-i18next";

export const ProductDetail = () => {
    const { id } = useParams();
    const productId = Number(id);

    const {t} = useTranslation(['product', 'common']);

    if (!id || isNaN(productId)) {
        return <ErrorMessage message={t('product:details.errorInvalidId')} />;
    }

    const { data, error, isLoading } = useGetProductById(productId);

    if (isLoading) {
        return <Loading />;
    }

    if (error) {
        return <ErrorMessage message={t('product:details.errorLoading')} />;
    }

    return (
        <div className="p-4">
            <h1 className="text-2xl font-bold mb-4">{data?.title}</h1>

            <img 
                src={data?.thumbnail} 
                alt={data?.title} 
                className="mb-4 w-64 h-64 object-cover"
            />

            <p className="text-gray-700">{data?.description}</p>

            <div className="mt-4 text-xl font-semibold">
                {t('product:details.price')}: ${data?.price}
            </div>

            <div className="mt-2 text-yellow-600 font-medium">
                {t('product:details.rating')}: {data?.rating}
            </div>

            <button
                onClick={() => window.history.back()}
                className="mt-6 px-4 py-2 bg-gray-200 rounded"
            >
                {t('common:buttons.back')}
            </button>
        </div>
    )
}