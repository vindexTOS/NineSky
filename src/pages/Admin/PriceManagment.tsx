import React, { useEffect, useState } from 'react';
import { GetPrice, UpdatePrice } from '../../API/Price/PriceManagment';
import { useQuery, useMutation } from '@tanstack/react-query';
import { Card, Divider, Input, Button, message } from 'antd';

export default function PriceManagment() {
  const [prices, setPrices] = useState<any>(null);

  // Fetch prices
  const { data, refetch } = useQuery({
    queryKey: ['parcels-price'],
    queryFn: () => GetPrice(),
  
  });
  useEffect(() => {
    if (data?.data) {
      setPrices(data.data);
    }
  }, [data]);
  // Update price mutation
  const updatePriceMutation = useMutation({
    mutationFn: (updatedPrices) => UpdatePrice(updatedPrices),
    onSuccess: () => {
      message.success('Prices updated successfully');
      refetch();  
    },
    onError: (error) => {
      message.error(error.message || 'An error occurred while updating prices');
    },
  });

  // Handle input change for updating prices
  const handleInputChange = (country: any, value: any) => {
    setPrices((prevPrices: any) => ({
      ...prevPrices,
      [country]: value,
    }));
  };

  // Handle save button click
  const handleSave = () => {
    if (prices) {
      // Prepare the data to match the API requirements
      const updateData:any = {
        china: parseFloat(prices.China),
        turkey: parseFloat(prices.Turkey),
      };

      updatePriceMutation.mutate(updateData);
    }
  };

  return (
    <div className="p-5">
      <h2 className="text-2xl font-semibold mb-4">Price Management</h2>
      <Card className="max-w-lg mx-auto p-6 shadow-md rounded-lg">
        {prices && Object.keys(prices).length > 0 && (
          Object.entries(prices).map(([country, price]: any) => (
            <div key={country}>
              <div className="flex justify-between items-center py-2">
                <span className="font-semibold">{country}</span>
                <Input
                  value={price}
                  onChange={(e) => handleInputChange(country, e.target.value)}
                  style={{ width: '100px' }}
                />
              </div>
              <Divider className="my-1" />
            </div>
          ))
        )}
        <Button
          type="primary"
          className="mt-4 w-full"
          onClick={handleSave}
          loading={updatePriceMutation.isPending}
        >
          Save Changes
        </Button>
      </Card>
    </div>
  );
}
