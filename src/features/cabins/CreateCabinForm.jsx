import Input from '../../ui/Input';
import Form from '../../ui/Form';
import Button from '../../ui/Button';
import FileInput from '../../ui/FileInput';
import Textarea from '../../ui/Textarea';
import FormRow from '../../ui/FormRow';

import { useForm } from 'react-hook-form';
import { useCreateCabin } from './useCreateCabin';
import { useUpdateCabin } from './useUpdateCabin';
// import { useMutation, useQueryClient } from '@tanstack/react-query';
// import toast from 'react-hot-toast';
// import { createUpdateCabin } from '../../services/apiCabins';

function CreateCabinForm({ cabinEdit = {} }) {
  const { isCreating, createCabin } = useCreateCabin();
  const { isUpdating, updateCabin } = useUpdateCabin();

  const { id: editCabinId, ...editCabinValues } = cabinEdit;

  // check if form is being used to ADD or EDIT cabin
  const isEdit = Boolean(editCabinId);

  // default values when editing the form
  const { register, handleSubmit, reset, getValues, formState } = useForm({
    defaultValues: isEdit ? editCabinValues : {}
  });

  const { errors } = formState;

  /*  const queryClient = useQueryClient();

  const { isLoading: isCreating, mutate: createCabin } = useMutation({
    mutationFn: createUpdateCabin,

    onSuccess: () => {
      toast.success('New cabin created successfully');
      queryClient.invalidateQueries({ queryKey: ['cabins'] });

      // reset form
      reset();
    },

    onError: error => toast.error(error.message)
  }); */

  /*   const { isLoading: isUpdating, mutate: updateCabin } = useMutation({
    mutationFn: ({ newCabin, id }) => createUpdateCabin(newCabin, id),

    onSuccess: () => {
      toast.success('cabin updated successfully');
      queryClient.invalidateQueries({ queryKey: ['cabins'] });

      // reset form
      reset();
    },

    onError: error => toast.error(error.message)
  }); */

  const onSubmit = data => {
    // console.log({ ...data, image: data.image[0] });
    // mutate({ ...data, image: data.image[0] });

    console.log(data);

    // check if image path is a string
    const image = typeof data.image === 'string' ? data.image : data.image[0];

    if (isEdit) {
      updateCabin({ newCabin: { ...data, image }, id: editCabinId }, { onSuccess: () => reset() });
    } else {
      createCabin({ ...data, image }, { onSuccess: () => reset() });
    }
  };

  const onError = errors => {
    // console.log(errors);
  };

  const isLoading = isCreating || isUpdating;

  return (
    <Form onSubmit={handleSubmit(onSubmit, onError)}>
      {/* <FormRow>
          <Label htmlFor="name">Cabin name</Label>
          <Input
          type="text"
          id="name"
          {...register('name', { required: 'This field is required' })}
        />
        {errors?.name?.message && <Error>{errors.name.message}</Error>}
      </FormRow> */}

      <FormRow label={'Cabin name'} error={errors?.name?.message}>
        <Input
          type="text"
          id="name"
          disabled={isLoading}
          {...register('name', { required: 'This field is required' })}
        />
      </FormRow>

      <FormRow label={'Maximum capacity'} error={errors?.maxCapacity?.message}>
        <Input
          type="number"
          id="maxCapacity"
          disabled={isLoading}
          {...register('maxCapacity', {
            required: 'This field is required',
            min: { value: 1, message: 'Capacity should be at least 1' }
          })}
        />
      </FormRow>

      <FormRow label={'Regular price'} error={errors?.regularPrice?.message}>
        <Input
          type="number"
          id="regularPrice"
          disabled={isLoading}
          {...register('regularPrice', {
            required: 'This field is required',
            min: { value: 1, message: 'Price should be at least 1' }
          })}
        />
      </FormRow>

      <FormRow label={'Discount'} error={errors?.discount?.message}>
        <Input
          type="number"
          id="discount"
          defaultValue={0}
          disabled={isLoading}
          {...register('discount', {
            required: 'This field is required',
            validate: value =>
              Number(value) < Number(getValues().regularPrice) ||
              'discount should be less than regular price'
          })}
        />
      </FormRow>

      <FormRow label={'Description for website'} error={errors?.description?.message}>
        <Textarea
          type="number"
          id="description"
          defaultValue=""
          disabled={isLoading}
          {...register('description', { required: 'This field is required' })}
        />
      </FormRow>

      <FormRow label={'Cabin photo'}>
        <FileInput
          id="image"
          accept="image/*"
          {...register('image', { required: isEdit ? false : 'This field is required' })}
        />
      </FormRow>

      <FormRow>
        {/* type is an HTML attribute! */}
        <Button variation="secondary" type="reset">
          Cancel
        </Button>
        <Button disabled={isCreating}>{isEdit ? 'Edit cabin' : 'Create new cabin'}</Button>
      </FormRow>
    </Form>
  );
}

export default CreateCabinForm;
