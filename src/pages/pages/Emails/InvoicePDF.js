import { Page, View, Text, Font, Image, Document, StyleSheet, PDFViewer } from '@react-pdf/renderer';
// utils
import { fCurrency, fNumber } from '../../../utils/formatNumber';
import Oswald from '../fonts/Oswald-Light.ttf';
import LatoBlack from '../fonts/Lato-Regular.ttf';
import firebase from '../../../firebase'
import { style } from '@mui/system';
import { useEffect } from 'react';
// ----------------------------------------------------------------------

Font.register({
  family: 'Oswald',
  fonts: [
    { src: Oswald },
   ]
});

Font.register({
  family: 'Lato',
  fonts: [
    { src: LatoBlack },
      ]
});

const styles = StyleSheet.create({
  col2: { width: '5%' },
  col4: { width: '25%' },
  col8: { width: '75%' },
  col6: { width: '50%' },
  col12: { width: '100%' },
  mb8: { marginBottom: 8 },
  mb40: { marginBottom: 20 },
  overline: {
    fontSize: 8,
    marginBottom: 8,
    fontWeight: 700,
    letterSpacing: 1.2,
    textTransform: 'uppercase'
  },
  bigText: {
    fontSize: 16,
    marginBottom: 0,
    fontWeight: 100,
    letterSpacing: 0,
    lineHeight: 1.2,
    textTransform: 'uppercase'
  },
  h3: { fontSize: 16, fontWeight: 700 },
  h4: { fontSize: 13, fontWeight: 900 },
  body1: { fontSize: 10 },
  subtitle2: { fontSize: 9, fontWeight: 700, fontFamily: 'Lato' },
  alignRight: { textAlign: 'right' },
  divider: { marginVertical: 10 },
  page: {
    padding: '40px 24px 0 24px',
    fontSize: 9,
    lineHeight: 1.6,
    fontFamily: 'Lato',
    backgroundColor: '#fff',
   
  },
  header: {
    left: 24,
    right: 24,
    top: 0,
    paddingVertical: 10,
    margin: 'auto',
    borderBottomWidth: 1,
    borderStyle: 'solid',
    position: 'absolute',
    borderColor: '#DFE3E8'
  },
  image: {
    width: "45%",
   
  },
  footer: {
    left: 24,
    right: 24,
    bottom: 24,
    paddingVertical: 10,
    margin: 'auto',
    borderTopWidth: 1,
    borderStyle: 'solid',
    position: 'absolute',
    borderColor: '#DFE3E8'
  },
  otherText : {
    fontFamily: 'Lato',
    fontWeight:"bold"
  },
  gridContainer: { flexDirection: 'row', justifyContent: 'space-between' },
  table: { display: 'flex', width: 'auto' },
  tableHeader: {},
  tableBody: {},
  tableRow: {
    padding: '8px 0',
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderStyle: 'solid',
    borderColor: '#DFE3E8'
  },
  noBorder: { paddingTop: 8, paddingBottom: 0, borderBottomWidth: 0 },
  tableCell_1: { width: '10%' },
  tableCell_2: { width: '70%', paddingRight: 16 },
  tableCell_3: { width: '15%' },
  tableCell_4: { width: '33%' }
}); 

export default function InvoicePDF({ data, user, car }) {
 console.log(data)
 let chauffer = data.chauffer
 let vat = 0.16 * data.totalAmount
 let other = data.other
 let advance = data.advance
 
  return (
    // <PDFViewer width={"100%"} height={1000}>
   <Document>
      <Page size="A4" style={styles.page}>
   
        <View style={{...styles.gridContainer, ...styles.mb40}}>
          <View style={styles.col8}>
          <Image style={styles.image} src="/logo.png" />               
             </View>
             <View style={styles.col4}>
                <Text style={{...styles.subtitle2}}>Date invoiced {new firebase.firestore.Timestamp(data.startDate.seconds, data.startDate.nanoseconds).toDate().toLocaleDateString()}</Text>
                <Text style={{...styles.subtitle2}}>{data.q_id ? "QUOTE" : "INVOICE"} # IMP {data.q_id}</Text>
                <Text style={{...styles.subtitle2}}>TPIN : 1020134212</Text>
                <Text>{"\n"}</Text>
                {/* <Text style={{...styles.subtitle2}}>Client TPIN : </Text> */}
             </View>
        </View>
         
        <View style={{...styles.gridContainer, ...styles.mb40}}>
        <View style={styles.col6}>          
            <Text style={{...styles.h4}}>From</Text>
            <Text style={{...styles.subtitle2}}>Impala Car Rental 
            {"\n"}5546 Lukanga Road, Kalundu
            {"\n"}Lusaka
            {"\n"}Phone : 021 1292 041
            {"\n"}Email : info@impalacarrental.co.zm
            {"\n"}Website : www.impalacarrental.co.zm
            </Text>
            <View style={styles.divider} /> 
          </View>
          <View style={styles.col6}>          
            <Text style={{...styles.h4,  textAlign:"right"}}>Client</Text>
            <Text style={{...styles.subtitle2, textAlign:"right"}}>{data.name} 
            {"\n"}{data.q_id ? "" : user.address}
            {"\n"}{data.q_id ? "" : user.location}
            {"\n"}Phone : {data.phone}
            {"\n"}Email : {data.email}
            {"\n"}NRC/Drivers license : {data.q_id ? "" : user.drivers_license}
            </Text>
            <View style={styles.divider} /> 
          </View> 
        </View>

        <View style={{...styles.gridContainer, ...styles.mb40}}>
            <View style={styles.col4}><Text style={{...styles.body1, fontWeight:"bold"}}>Description</Text></View>
            <View style={styles.col4}><Text style={{...styles.body1, textAlign:"center"}}>Unit</Text></View>
            <View style={styles.col4}><Text style={{...styles.body1}}>Cost  Per Day</Text></View>
            <View style={styles.col4}><Text style={{...styles.body1, textAlign:"right"}}>Total</Text></View>
        </View>
      
        <View style={{...styles.gridContainer, ...styles.mb40}}>
            <View style={styles.col4}>
                <Text style={{...styles.body1, fontWeight:"bold"}}>{car.make} {car.model} / {car.plate}</Text> 
                <Text style={{...styles.body1, fontWeight:"bold"}}>Total Mileage : {car.mileage}</Text>
                <Text style={{...styles.body1, fontWeight:"bold"}}>
                {new firebase.firestore.Timestamp(data.startDate.seconds, data.startDate.nanoseconds).toDate().toLocaleDateString()} 
                - 
                {new firebase.firestore.Timestamp(data.endDate.seconds, data.endDate.nanoseconds).toDate().toLocaleDateString()}</Text>
                <Text style={{...styles.body1, fontWeight:"bold"}}>Extras : {data.myExtras.map((e,index)=>(`${e.name}, `))}</Text>
            </View>
            <View style={styles.col4}><Text style={{...styles.body1, textAlign:"center"}}>{data.numberOfDays}{"\n"}{"\n"}{"\n"}{data.myExtras.length}</Text></View>
            <View style={styles.col4}><Text style={{...styles.body1}}>{data.rating}</Text></View>
            <View style={styles.col4}><Text style={{...styles.body1, textAlign:"right"}}>{data.total}
            {"\n"}{"\n"}{"\n"}{parseFloat(data.extras).toFixed(2)}</Text></View>
        </View>

        <View style={{...styles.gridContainer, ...styles.mb40}}>
            <View style={styles.col6}>          
                <Text style={{...styles.h4}}>Payment Details</Text>
                <Text style={{...styles.subtitle2}}>
                    Account Name: 	IMPALA CAR RENTAL LTD{"\n"}
                    Account number:	9130003377001   (ZMW CURRENT A/C){"\n"}
                    Bank Name: 	Stanbic Bank{"\n"}
                    Branch Code:	Arcades Branch(041010){"\n"}
                    Sort Code:	040010{"\n"}
                    Swift Code:	SBICZMLX{"\n"}
                </Text>
            </View>
            <View style={styles.col6}>          
                 <Text style={{...styles.subtitle2, textAlign:"right"}}>
                Taxable Amount	 {fNumber(data.totalAmount)} {"\n"}
                Chauffer	{chauffer}{"\n"}
                VAT	 {parseFloat(vat).toFixed(2)} {"\n"}
                Other Charges	{other} {"\n"}
                Total Charges	{fNumber(vat + parseFloat(data.totalAmount) + parseFloat(other) + parseFloat(chauffer))} {"\n"}
                Advance Payment	 {advance}
                </Text>
                <Text style={{...styles.h4, textAlign:"right"}}>Amount Due : {fNumber(parseFloat(vat) + parseFloat(data.totalAmount) + parseFloat(chauffer) + parseFloat(other) + parseFloat(advance))} {"\n"}</Text>
            </View>
      
        </View>
       
        <View style={{...styles.gridContainer, ...styles.mb40}}>
            <View style={styles.col4}>           
            <Image style={{...styles.image, width:"80%"}} src="/qr_code.jpg" />             
            </View>
            <View style={styles.col8}>           
                 <Text style={{...styles.subtitle2}}>
                Scan the QR code to learn know{"\n"}{"\n"}
               Download the Impala App from the Google Play Store for easier and quicker booking.{"\n"}{"\n"}</Text>
               <Text style={{...styles.subtitle2}}>
                Thank you for being a part of Impala Car Rental. We look forward to seeing you again.{"\n"}{"\n"}
                {new Date().getFullYear()} Impala Car Rental Company. All Rights Reserved. Terms and Conditions Apply.</Text>
            </View>
          </View>
   

 
  </Page>
 
  
    </Document>  
    // </PDFViewer>
  );
}
