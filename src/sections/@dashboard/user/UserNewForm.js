import * as Yup from 'yup';
import PropTypes from 'prop-types';
import { useCallback } from 'react';
//import { useSnackbar } from 'notistack';
import { useNavigate } from 'react-router-dom';
import { Form, FormikProvider, useFormik } from 'formik';
// material
import { LoadingButton } from '@mui/lab';
import { Box, Card, Grid, Stack, Button, CardHeader, Tooltip, TextField, Typography, FormHelperText, FormControlLabel } from '@mui/material';
// utils
import { fData } from '../../../utils/formatNumber';
 
// routes
//import { PATH_DASHBOARD } from '../../../routes/paths';
//
import Label from '../../../components/Label';
import useUsers from 'src/hooks/useUsers';


// ----------------------------------------------------------------------

UserNewForm.propTypes = {
  isEdit: PropTypes.bool,
  currentUser: PropTypes.object
};

export default function UserNewForm({ isEdit, currentUser }) {

  let users = useUsers().docs

  const navigate = useNavigate();
  //const { enqueueSnackbar } = useSnackbar();

  const NewUserSchema = Yup.object().shape({
    name: Yup.string().required('Name is required'),
    email: Yup.string().required('Email is required').email(),
    phoneNumber: Yup.string().required('Phone number is required'),
    address: Yup.string().required('Address is required'),
    country: Yup.string().required('country is required'),
    company: Yup.string().required('Company is required'),
    state: Yup.string().required('State is required'),
    city: Yup.string().required('City is required'),
    role: Yup.string().required('Role Number is required'),
    avatarUrl: Yup.mixed().required('Avatar is required')
  });

  const formik = useFormik({


    enableReinitialize: true,
    initialValues: {
      name: currentUser?.name || '',
      email: currentUser?.email || '',
      phone: currentUser?.phone || '',
      address: currentUser?.address || '',
      country: currentUser?.country || '',
      state: currentUser?.state || '',
      city: currentUser?.city || '',
      zipCode: currentUser?.zipCode || '',
      profile_picture: currentUser?.profile_picture || null,
      isVerified: currentUser?.isVerified || true,
      status: currentUser?.status,
      company: currentUser?.company || '',
      role: currentUser?.role || ''
    },
    validationSchema: NewUserSchema,
    onSubmit: async (values, { setSubmitting, resetForm, setErrors }) => {
      try {
      //  await fakeRequest(500);
        resetForm();
        setSubmitting(false);
       // enqueueSnackbar(!isEdit ? 'Create success' : 'Update success', { variant: 'success' });
     //   navigate(PATH_DASHBOARD.user.list);
      } catch (error) {
        console.error(error);
        setSubmitting(false);
        setErrors(error);
      }
    }
  });

  const { errors, values, touched, handleSubmit, isSubmitting, setFieldValue, getFieldProps } = formik;

  const handleDrop = useCallback(
    (acceptedFiles) => {
      const file = acceptedFiles[0];
      if (file) {
        setFieldValue('avatarUrl', {
          ...file,
          preview: URL.createObjectURL(file)
        });
      }
    },
    [setFieldValue]
  );

  return (
    <FormikProvider value={formik}>
      <Form noValidate autoComplete="off" onSubmit={handleSubmit}>
        <Grid container spacing={3}>
                 <Grid item xs={6} md={6}>
                 <Card>
      <CardHeader
        title="Users"
        subheader={`You have ${users.length} contacts`}
        // action={
        //   <Tooltip title="Add Contact">
        //     <MIconButton color="primary" size="large">
        //       <Icon icon={plusFill} width={20} height={20} />
        //     </MIconButton>
        //   </Tooltip>
        // }
      />
      <Stack spacing={3} sx={{ p: 3 }}>
        {users.map((contact) => (
          <Stack direction="row" alignItems="center" key={contact.id}>
            
            <Box sx={{ flexGrow: 1, ml: 2, minWidth: 100 }}>
              <Typography variant="subtitle2" sx={{ mb: 0.5 }} noWrap>
                {contact.firstName}
              </Typography>
              <Typography variant="body2" sx={{ color: 'text.secondary' }} noWrap>
                {contact.email}
              </Typography>
            </Box>

            {/* <Tooltip title="Quick Transfer">
              <MIconButton size="small">
                <Icon icon={flashFill} width={22} height={22} />
              </MIconButton>
            </Tooltip> */}
          </Stack>
        ))}
      </Stack>
    </Card>
                 </Grid>
                 {/* <Grid item xs={6} md={6}>
            <Card sx={{ p: 3 }}>
              <Stack spacing={3}>
                <Stack direction={{ xs: 'column', sm: 'row' }} spacing={{ xs: 3, sm: 2 }}>
                  <TextField
                    fullWidth
                    label="Full Name"
                    {...getFieldProps('name')}
                    error={Boolean(touched.name && errors.name)}
                    helperText={touched.name && errors.name}
                  />
                  <TextField
                    fullWidth
                    label="Email Address"
                    {...getFieldProps('email')}
                    error={Boolean(touched.email && errors.email)}
                    helperText={touched.email && errors.email}
                  />
                </Stack>

                <Stack direction={{ xs: 'column', sm: 'row' }} spacing={{ xs: 3, sm: 2 }}>
                  <TextField
                    fullWidth
                    label="Phone Number"
                    {...getFieldProps('phone')}
                    error={Boolean(touched.phone && errors.phone)}
                    helperText={touched.phone && errors.phone}
                  />
             
                </Stack>

                <Stack direction={{ xs: 'column', sm: 'row' }} spacing={{ xs: 3, sm: 2 }}>
                  <TextField
                    fullWidth
                    label="City"
                    {...getFieldProps('city')}
                    error={Boolean(touched.city && errors.city)}
                    helperText={touched.city && errors.city}
                  />
                  <TextField
                    fullWidth
                    label="Address"
                    {...getFieldProps('address')}
                    error={Boolean(touched.address && errors.address)}
                    helperText={touched.address && errors.address}
                  />
                </Stack>
                <Box sx={{ mt: 3, display: 'flex', justifyContent: 'flex-end' }}>
                  <LoadingButton type="submit" variant="contained" loading={isSubmitting}>
                    {!isEdit ? 'Create User' : 'Save Changes'}
                  </LoadingButton>
                </Box>
              </Stack>
            </Card>
          </Grid> */}
        </Grid>
      </Form>
    </FormikProvider>
  );
}

     {/* <TextField
                    select
                    fullWidth
                    label="Country"
                    placeholder="Country"
                    {...getFieldProps('country')}
                    SelectProps={{ native: true }}
                    error={Boolean(touched.country && errors.country)}
                    helperText={touched.country && errors.country}
                  >
                    <option value="" />
                    {countries.map((option) => (
                      <option key={option.code} value={option.label}>
                        {option.label}
                      </option>
                    ))}
                  </TextField> */}
