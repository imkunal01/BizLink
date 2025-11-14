import { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { AnimatePresence } from 'framer-motion'
import { toast } from 'sonner'
import { Eye, EyeOff, Loader2 } from 'lucide-react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Form, FormField, FormItem, FormMessage } from '@/components/ui/form'
import { Select, SelectItem } from '@/components/ui/select'
import { registerSchema, roleOptions } from '@/lib/validations/authSchemas'
import { useRegisterUserMutation } from '@/store/api/authApi'
import { resetAuthState } from '@/store/slices/authSlice'
import { getDashboardRoute } from '@/utils/roleUtils'

const Register = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const { isAuthenticated, role } = useSelector((state) => state.auth)
  const [registerUser, { isLoading }] = useRegisterUserMutation()
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)

  const form = useForm({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      name: '',
      email: '',
      password: '',
      confirmPassword: '',
      role: 'customer',
    },
  })

  // Redirect if already authenticated
  useEffect(() => {
    if (isAuthenticated && role) {
      const dashboardRoute = getDashboardRoute(role)
      navigate(dashboardRoute)
    }
  }, [isAuthenticated, role, navigate])

  // Reset auth error on mount
  useEffect(() => {
    dispatch(resetAuthState())
  }, [dispatch])

  const onSubmit = async (data) => {
    try {
      const result = await registerUser(data).unwrap()
      toast.success('Registration successful!')
      
      // Navigate based on role
      const dashboardRoute = getDashboardRoute(result.user.role)
      navigate(dashboardRoute)
    } catch (error) {
      const errorMessage = error?.data?.message || 'Registration failed. Please try again.'
      toast.error(errorMessage)
      form.setError('root', { message: errorMessage })
    }
  }

  return (
    <div className="container mx-auto px-4 py-8 max-w-md">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
      >
        <Card className="shadow-lg">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.1, duration: 0.3 }}
          >
            <CardHeader className="text-center">
              <CardTitle className="text-2xl">Create Account</CardTitle>
              <CardDescription>
                Join Kripa Connect today
              </CardDescription>
            </CardHeader>
          </motion.div>
          <CardContent>
            <Form {...form}>
              <motion.form 
                onSubmit={form.handleSubmit(onSubmit)} 
                className="space-y-4"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.2, duration: 0.3 }}
              >
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.3, duration: 0.3 }}
                >
                  <FormField name="name">
                    <FormItem>
                      <Label htmlFor="name">Full Name</Label>
                      <Input
                        id="name"
                        type="text"
                        placeholder="Enter your full name"
                        {...form.register('name')}
                        disabled={isLoading}
                        className="transition-all duration-200 focus:ring-2 focus:ring-primary focus:ring-offset-2"
                      />
                      <FormMessage>{form.formState.errors.name?.message}</FormMessage>
                    </FormItem>
                  </FormField>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.4, duration: 0.3 }}
                >
                  <FormField name="email">
                    <FormItem>
                      <Label htmlFor="email">Email</Label>
                      <Input
                        id="email"
                        type="email"
                        placeholder="Enter your email"
                        {...form.register('email')}
                        disabled={isLoading}
                        className="transition-all duration-200 focus:ring-2 focus:ring-primary focus:ring-offset-2"
                      />
                      <FormMessage>{form.formState.errors.email?.message}</FormMessage>
                    </FormItem>
                  </FormField>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.5, duration: 0.3 }}
                >
                  <FormField name="password">
                    <FormItem>
                      <Label htmlFor="password">Password</Label>
                      <div className="relative">
                        <Input
                          id="password"
                          type={showPassword ? 'text' : 'password'}
                          placeholder="Enter your password"
                          {...form.register('password')}
                          disabled={isLoading}
                          className="transition-all duration-200 focus:ring-2 focus:ring-primary focus:ring-offset-2 pr-10"
                        />
                        <Button
                          type="button"
                          variant="ghost"
                          size="sm"
                          className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent transition-colors duration-200"
                          onClick={() => setShowPassword(!showPassword)}
                          disabled={isLoading}
                        >
                          {showPassword ? (
                            <EyeOff className="h-4 w-4 transition-transform duration-200" />
                          ) : (
                            <Eye className="h-4 w-4 transition-transform duration-200" />
                          )}
                        </Button>
                      </div>
                      <FormMessage>{form.formState.errors.password?.message}</FormMessage>
                    </FormItem>
                  </FormField>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.6, duration: 0.3 }}
                >
                  <FormField name="confirmPassword">
                    <FormItem>
                      <Label htmlFor="confirmPassword">Confirm Password</Label>
                      <div className="relative">
                        <Input
                          id="confirmPassword"
                          type={showConfirmPassword ? 'text' : 'password'}
                          placeholder="Confirm your password"
                          {...form.register('confirmPassword')}
                          disabled={isLoading}
                          className="transition-all duration-200 focus:ring-2 focus:ring-primary focus:ring-offset-2 pr-10"
                        />
                        <Button
                          type="button"
                          variant="ghost"
                          size="sm"
                          className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent transition-colors duration-200"
                          onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                          disabled={isLoading}
                        >
                          {showConfirmPassword ? (
                            <EyeOff className="h-4 w-4 transition-transform duration-200" />
                          ) : (
                            <Eye className="h-4 w-4 transition-transform duration-200" />
                          )}
                        </Button>
                      </div>
                      <FormMessage>{form.formState.errors.confirmPassword?.message}</FormMessage>
                    </FormItem>
                  </FormField>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.7, duration: 0.3 }}
                >
                  <FormField name="role">
                    <FormItem>
                      <Label htmlFor="role">Account Type</Label>
                      <Select
                        value={form.watch('role')}
                        onChange={(value) => form.setValue('role', value)}
                        disabled={isLoading}
                      >
                        {roleOptions.map((option) => (
                          <SelectItem key={option.value} value={option.value}>
                            {option.label}
                          </SelectItem>
                        ))}
                      </Select>
                      <FormMessage>{form.formState.errors.role?.message}</FormMessage>
                    </FormItem>
                  </FormField>
                </motion.div>

                <AnimatePresence>
                  {form.formState.errors.root && (
                    <motion.div
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      transition={{ duration: 0.2 }}
                    >
                      <FormMessage>{form.formState.errors.root.message}</FormMessage>
                    </motion.div>
                  )}
                </AnimatePresence>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.8, duration: 0.3 }}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <Button
                    type="submit"
                    className="w-full relative overflow-hidden"
                    disabled={isLoading}
                  >
                    {isLoading ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Creating Account...
                      </>
                    ) : (
                      'Create Account'
                    )}
                  </Button>
                </motion.div>
              </motion.form>
            </Form>

            <motion.div 
              className="mt-4 text-center text-sm"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.9, duration: 0.3 }}
            >
              <span className="text-muted-foreground">Already have an account? </span>
              <Link
                to="/login"
                className="text-primary hover:underline font-medium transition-colors duration-200"
              >
                Login here
              </Link>
            </motion.div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  )
}

export default Register