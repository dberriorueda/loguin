
  import { View, Text } from "react-native";
  import {useForm, Controller} from 'react-hook-form';
  import { TextInput, Button } from "react-native-paper";

  export default function HomeScreen({navigation, route}){

      const {
          control, reset,
          handleSubmit,
          formState:{errors},
      } = useForm({
          defaultValues: {
              iduser:"",
              fullname:"",
              email:"",
              password:"",
              uri:"",
              age:"",
          },
      });
      const onSubmit = (data)=> {
        console.log(data);
      }
      return(
          <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center'}}>
              <Text>Bienvenido {route.params.email}</Text>
              <Controller
                control={control}
                rules={{
                    required: true,
                    maxlength:20,
                    minlength:1,
                    pattern:/^[0-9]+$/
                }}
                render={({field:{onChange,onBlur,value}}) =>(
                    <TextInput
                        label="Identificacion" style={{fontFamily: 'inital'}}
                        onBlur={onBlur}
                        onChangeText={onChange}
                        value={value}
                    />
                )}
                name="iduser"
                />
                {errors.iduser?.type == "required" && <Text style={{color:'red'}}>Id del usuario es obligatorio.</Text>}
                {errors.iduser?.type == "maxlength" && <Text style={{color:'red'}}>La longitud debe ser de 20.</Text>}
                {errors.iduser?.type == "minlength" && <Text style={{color:'red'}}>La longitud minima debe ser de 1.</Text>}
                {errors.iduser?.type == "pattern" && <Text style={{color:'red'}}>Solo debe ingresar numeros.</Text>}

            <Controller
              control={control}
              rules={{
                  required:true,
                  maxlength:40,
                  minlength:1,
                  pattern: /^[A-ZÑa-zñáéíóúÁÉÍÓÚ'° ]+$/,
                  //Ingresar numeros para eso se usa el pattern
                }}
                render={({ field: {onChange,onBlur,value}})=>(
                  <TextInput
                  style={{fontFamily:'inital'}}
                  label="Nombre Completo"
                  onBlur={onBlur}
                  onChangeText={onChange}
                  value={value}
                />
              )}
              name="fullname"
            />
            {errors.fullname?.type == "required" && <Text style={{color:'red'}}>Nombre completo es obligatorio.</Text>}
            {errors.fullname?.type == "maxLength" && <Text style={{color:'red'}}>La longitud debe ser de 40.</Text>}
            {errors.fullname?.type == "minLength" && <Text style={{color:'red'}}>La longitud mínima debe ser de 1</Text>}
            {errors.fullname?.type == "pattern" && <Text style={{color:'red'}}>.</Text>}

            <Controller
              control={control}
              rules={{
                  required:true,
                  maxlength:100,
                  minlength:1,
                  pattern:/^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/
                }}
                render={({ field: {onChange,onBlur,value}})=>(
                  <TextInput
                  style={{fontFamily:'inital'}}
                  label="Correo Electronico"
                  onBlur={onBlur}
                  onChangeText={onChange}
                  value={value}
                />
              )}
              name="email"
            />
            {errors.email?.type == "required" && <Text style={{color:'red'}}>El correo es obligatorio</Text>}
            {errors.email?.type == "maxLength" && <Text style={{color:'red'}}>La longitud debe ser de 100</Text>}
            {errors.email?.type == "minLength" && <Text style={{color:'red'}}>La longitud mínima debe ser de 1.</Text>}
            {errors.email?.type == "pattern" && <Text style={{color:'red'}}>No debe usar caracteres especiales.</Text>}

            <Controller
              control={control}
              rules={{
                  required:true,
                  maxlength:10,
                  minlength:1,
                  pattern:/^[a-z0-9]+$/
                  
                }}
                render={({ field: {onChange,onBlur,value}})=>(
                  <TextInput
                  style={{fontFamily:'inital'}}
                  label="Contraseña"
                  onBlur={onBlur}
                  onChangeText={onChange}
                  value={value}
                  secureTextEntry={true} //Asegurar que la contraseña sea requerida
                />
              )}
              name="password"
            />
            {errors.password?.type == "required" && <Text style={{color:'red'}}>El correo es obligatorio</Text>}
            {errors.password?.type == "maxLength" && <Text style={{color:'red'}}>La longitud debe ser hasta 30 chars.</Text>}
            {errors.password?.type == "minLength" && <Text style={{color:'red'}}>La longitud mínima es de 3 chars.</Text>}
            {errors.password?.type == "pattern" && <Text style={{color:'red'}}>Debe ingresar solo letras y/o espacios</Text>}

            <Controller
              control={control}
              rules={{
                  required:true,
                  maxlength:30,
                  minlength:1,
                  pattern:/^[0-9]+$/
                }}
                render={({ field: {onChange,onBlur,value}})=>(
                  <TextInput
                  style={{fontFamily:'inital'}}
                  label="Años"
                  onBlur={onBlur}
                  onChangeText={onChange}
                  value={value}
                />
              )}
              name="age"
            />
            {errors.age?.type == "required" && <Text style={{color:'red'}}>La edad es obligatoria.</Text>}
            {errors.age?.type == "maxLength" && <Text style={{color:'red'}}>La longitud debe ser de 40</Text>}
            {errors.age?.type == "minLength" && <Text style={{color:'red'}}>La longitud mínima debe ser de 1</Text>}
            {errors.age?.type == "pattern" && <Text style={{color:'red'}}>No debe usar caracteristicas especiales</Text>}

            


            <Button
                  style={{marginTop:20, backgroundColor:'powderblue'}}
                  icon="content-save"
                  mode="outlined"
                  onPress={handleSubmit(onSubmit)}
                  >
                    Guardar
                  </Button>
              {/*<Button title="submit" onPress={handlesubmit(onSubmit)}/> */}
          </View>
      );
  }