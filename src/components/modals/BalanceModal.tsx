 import { Form, Input, Button, message } from 'antd';
 
import { DepositeMoney } from '../../API/Deposite/Deposite';
import { useMutation } from '@tanstack/react-query';

 
export default function BalanceModal() {
    

 const mutation = useMutation({
     mutationFn:(body)=> {
        return DepositeMoney(body)
     },
     onSuccess(){
         message.success("Succsess")
     },
     onError(){
         message.error("Something went wrong")
     }
 })    
  const onFinish = async (values:any) => {
    
    await mutation.mutateAsync(values)

  };

  return (
    <div className="flex flex-col items-center justify-center w-full h-full bg-gray-100 p-4 rounded-lg shadow-lg">
      <h2 className="text-xl font-semibold mb-4 text-gray-800">შეიყვანეთ თანხა</h2>
      <Form
        onFinish={onFinish}
        layout="vertical"
        className="w-full max-w-sm"
      >
        <Form.Item
          name="amount"
          label="თანხა ლარებში"
          rules={[
            { required: true, message: 'გთხოვთ შეიყვანოთ თანხა' },
            { type: 'number', min: 1, message: 'თანხა უნდა იყოს 1 ან მეტი', transform: value => Number(value) },
          ]}
        >
          <Input
            type="number"
            placeholder="შეიყვანეთ თანხა"
          />
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit" className="w-full">
            გადახდა
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
}
