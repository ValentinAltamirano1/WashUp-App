import React, { useState, useEffect } from 'react';
import './Reservations.css';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import AutocompleteInput from './AutoCompleteInput';
import mercadopago from 'mercadopago';

const Reservations = () => {
  const [servicio, setServicio] = useState('');
  const [fecha, setFecha] = useState(null);
  const [horarioSeleccionado, setHorarioSeleccionado] = useState('');
  const [ubicacion, setUbicacion] = useState('');
  const [autocomplete, setAutocomplete] = useState(null);
  const [fechasNoDisponibles, setFechasNoDisponibles] = useState([]);
  const [horariosDisponibles, setHorariosDisponibles] = useState([]);

  const userEmail = localStorage.getItem('userEmail');

  const servicios = ['Lavado Exterior', 'Lavado Interior', 'Lavado Completo', 'Lavado de Motor', 'Lavado de Tapicería', 'Encerado', 'Limpieza de Vidrios', 'Desinfección', 'Lavado Express'];
  const horarios = ['9:00 AM', '10:00 AM', '11:00 AM', '2:00 PM', '3:00 PM'];

  const handlePlaceSelect = (place) => {
    const map = new Map(document.getElementById("map"), {
      center: new window.google.maps.LatLng(-34.902303398246524, -56.16405778520276),
      zoom: 12,
    });

    if (place.formatted_address) {
      setUbicacion(place.formatted_address);
    }
    if(place.geometry && place.geometry.location) {
      const latitud = place.geometry.location.lat();
      const longitude = place.geometry.location.lng();

      const ubicacion = new window.google.maps.LatLng(latitud, longitude)

      var pocitosCoords = [
        {lat: -34.902303398246524, lng: -56.16405778520276},
        {lat: -34.9148152747718, lng: -56.162591387465454},
        {lat: -34.91425733738307, lng: -56.156212582179776},
        {lat: -34.916489064185505, lng: -56.15587237923151},
        {lat: -34.917116726417206, lng: -56.154851770385974},
        {lat: -34.917883862625494, lng: -56.15136469016312},
        {lat: -34.918302297534666, lng: -56.1488982187858},
        {lat: -34.91714840751245, lng: -56.149030867414226},
        {lat: -34.91631963481924, lng: -56.14896348626628},
        {lat: -34.91475184387708, lng: -56.14834223132608},
        {lat: -34.91016322473169, lng: -56.14381805672548},
        {lat: -34.909870325440465, lng: -56.142865598914554},
        {lat: -34.909870325440465, lng: -56.14167502665116},
        {lat: -34.910260857596825, lng: -56.140901154679995},
        {lat: -34.91035849034585, lng: -56.14024633993529},
        {lat: -34.910944284401104, lng: -56.13947246796411},
        {lat: -34.9115300742766, lng: -56.138817653218894},
        {lat: -34.91211585997225, lng: -56.13846048153992},
        {lat: -34.91192059853865, lng: -56.13780566679523},
        {lat: -34.9114812586132, lng: -56.1372103806638},
        {lat: -34.911041916337446, lng: -56.13625792285286},
        {lat: -34.910944284401104, lng: -56.135484050881686},
        {lat: -34.91089546838941, lng: -56.13488876475026},
        {lat: -34.90606253956129, lng: -56.13679368037158},
        {lat: -34.90528143345153, lng: -56.137031794824054},
        {lat: -34.903572737933146, lng: -56.13756755234276},
        {lat: -34.902596324530506, lng: -56.13810330986095},
        {lat: -34.90122932626378, lng: -56.13846048153992},
        {lat: -34.90157107796411, lng: -56.139829639643054},
        {lat: -34.902352219366556, lng: -56.14262748446208},
        {lat: -34.902889249770574, lng: -56.14685401599698},
        {lat: -34.90313335333823, lng: -56.15119960475835},
        {lat: -34.90313335333823, lng: -56.1541760354166},
        {lat: -34.90303571199873, lng: -56.15822398111226},
        {lat: -34.90303571199873, lng: -56.15935502476239},
        {lat: -34.90293807054229, lng: -56.16072418286555},
        {lat: -34.902596324530506, lng: -56.16262909848689},
        {lat: -34.9025475035556, lng: -56.163343441844816},
        {lat: -34.902303398246524, lng: -56.16405778520276}
      ];
    
      var puntaCarretasCoords = [
        {lat: -34.91127062461402, lng: -56.166199801728155},
        {lat: -34.91153825791177, lng: -56.16912104271404},
        {lat: -34.911996916849255, lng: -56.16912104271404},
        {lat: -34.912302688051795, lng: -56.16930748162744},
        {lat: -34.91276134271959, lng: -56.169726969182065},
        {lat: -34.91302889009262, lng: -56.169960017823286},
        {lat: -34.913602202954756, lng: -56.170193066464506},
        {lat: -34.91425195269195, lng: -56.17033289564938},
        {lat: -34.9148252570134, lng: -56.17028628592155},
        {lat: -34.915398557329645, lng: -56.16968035945355},
        {lat: -34.91604829284819, lng: -56.169214262171096},
        {lat: -34.91727131046098, lng: -56.16907443298622},
        {lat: -34.91818856171128, lng: -56.169447310812316},
        {lat: -34.91868540185759, lng: -56.169913408094786},
        {lat: -34.91899114814592, lng: -56.17070577347616},
        {lat: -34.91941154743198, lng: -56.171125261030085},
        {lat: -34.92036699234693, lng: -56.17098543184589},
        {lat: -34.921284209000476, lng: -56.17098543184589},
        {lat: -34.923118612570796, lng: -56.17107865997377},
        {lat: -34.92399758259586, lng: -56.17107865997377},
        {lat: -34.924647250042455, lng: -56.17047273350646},
        {lat: -34.925755494401955, lng: -56.16651090660221},
        {lat: -34.926710865455895, lng: -56.16446007855767},
        {lat: -34.92804836624432, lng: -56.162875347796245},
        {lat: -34.9287362153028, lng: -56.161989762958484},
        {lat: -34.9291183511764, lng: -56.161057568392934},
        {lat: -34.92904192414469, lng: -56.160311812740744},
        {lat: -34.92816301286932, lng: -56.159286391972884},
        {lat: -34.92426509805808, lng: -56.15392627321992},
        {lat: -34.92113134600188, lng: -56.14959156848957},
        {lat: -34.92067273810224, lng: -56.149218690663474},
        {lat: -34.919296899026854, lng: -56.148799203108865},
        {lat: -34.91830322312896, lng: -56.148799203108865},
        {lat: -34.917003782648024, lng: -56.15471863860061},
        {lat: -34.91677446748636, lng: -56.155557613709846},
        {lat: -34.91650693232118, lng: -56.15597710126448},
        {lat: -34.91426723031104, lng: -56.15634172060952},
        {lat: -34.91482472627902, lng: -56.16280046341102},
        {lat: -34.92130533905649, lng: -56.162120595747965},
        {lat: -34.91970265449059, lng: -56.16577488443828},
        {lat: -34.91127062461402, lng: -56.166199801728155}
      ];
    
      var parqueBattleCoords = [
        {lat: -34.90115174525396, lng: -56.138634445563454},
        {lat: -34.90358649375466, lng: -56.13773700602441},
        {lat: -34.90973185588599, lng: -56.13562457681296},
        {lat: -34.90954296566139, lng: -56.13457796447336},
        {lat: -34.90903623252294, lng: -56.13401276210719},
        {lat: -34.907958289441076, lng: -56.13385584951137},
        {lat: -34.90638857583764, lng: -56.133316535062505},
        {lat: -34.90522577414799, lng: -56.13283739685984},
        {lat: -34.904472576669704, lng: -56.13234645058514},
        {lat: -34.90413169050836, lng: -56.130933788008434},
        {lat: -34.90463130668985, lng: -56.129195729932},
        {lat: -34.90519034521269, lng: -56.1279496351343},
        {lat: -34.90519964090699, lng: -56.12607509740255},
        {lat: -34.90446231602892, lng: -56.12456746840223},
        {lat: -34.90323466771992, lng: -56.12410692727062},
        {lat: -34.90145726040674, lng: -56.12414914048571},
        {lat: -34.9007906948435, lng: -56.12393078295709},
        {lat: -34.90002234627631, lng: -56.12284243293118},
        {lat: -34.89963181523893, lng: -56.122302730878936},
        {lat: -34.898330086052624, lng: -56.12044762516099},
        {lat: -34.898067388019086, lng: -56.11975671085934},
        {lat: -34.89752742713491, lng: -56.12028279485156},
        {lat: -34.89464669741332, lng: -56.12306324098317},
        {lat: -34.89204612220279, lng: -56.12517597141466},
        {lat: -34.8898950827974, lng: -56.12703504670448},
        {lat: -34.888444816729624, lng: -56.12816484711496},
        {lat: -34.88676214991065, lng: -56.130322393582276},
        {lat: -34.88657561429024, lng: -56.13874976155769},
        {lat: -34.887149259676995, lng: -56.14322545216976},
        {lat: -34.888640711048645, lng: -56.147421422180884},
        {lat: -34.88996005629339, lng: -56.150638324808426},
        {lat: -34.8909352109002, lng: -56.15427482343084},
        {lat: -34.891795631824714, lng: -56.15770152405548},
        {lat: -34.89271340421205, lng: -56.16014916735925},
        {lat: -34.89374588589269, lng: -56.162596810663004},
        {lat: -34.894835713588215, lng: -56.165114386632084},
        {lat: -34.902177333891075, lng: -56.164275194642386},
        {lat: -34.90269351687649, lng: -56.16189748400454},
        {lat: -34.90309499028773, lng: -56.15903024470593},
        {lat: -34.90303763706327, lng: -56.15511401542051},
        {lat: -34.90303763706327, lng: -56.151477516798124},
        {lat: -34.90286557714965, lng: -56.148120748838764},
        {lat: -34.902750870341215, lng: -56.145812970866814},
        {lat: -34.90246410261688, lng: -56.14357512556079},
        {lat: -34.901947918190515, lng: -56.141127482257005},
        {lat: -34.90115174525396, lng: -56.138634445563454}
      ];
    
      var malvinCoords = [
        {lat: -34.88672735113605, lng: -56.130473478751085},
        {lat: -34.88858000127564, lng: -56.12815192455521},
        {lat: -34.891131908613744, lng: -56.12597244969849},
        {lat: -34.89432477490366, lng: -56.12322465748582},
        {lat: -34.89609601214307, lng: -56.121779721710176},
        {lat: -34.898100313658084, lng: -56.11990854791766},
        {lat: -34.89747033574709, lng: -56.11886293279168},
        {lat: -34.89689862199145, lng: -56.11721348047561},
        {lat: -34.897142621794565, lng: -56.11606130584569},
        {lat: -34.89718637665601, lng: -56.114436273442834},
        {lat: -34.89668382142693, lng: -56.11294888038122},
        {lat: -34.89594824346232, lng: -56.110751090625584},
        {lat: -34.89587177678913, lng: -56.10824916227585},
        {lat: -34.89602838641279, lng: -56.10553411491769},
        {lat: -34.896574674351676, lng: -56.10322976565785},
        {lat: -34.897565357142284, lng: -56.10084993687606},
        {lat: -34.89698270473065, lng: -56.09950018315625},
        {lat: -34.89663311148345, lng: -56.09857666745326},
        {lat: -34.89663311148345, lng: -56.09786627075873},
        {lat: -34.896866173813, lng: -56.096729636047314},
        {lat: -34.896866173813, lng: -56.09616131869139},
        {lat: -34.89610871882296, lng: -56.09537988232752},
        {lat: -34.895526056384654, lng: -56.0938880492686},
        {lat: -34.89482685633429, lng: -56.091827898854206},
        {lat: -34.88591152929386, lng: -56.09886082584106},
        {lat: -34.885853256003585, lng: -56.10013953989106},
        {lat: -34.885853256003585, lng: -56.1020576109663},
        {lat: -34.88579498267197, lng: -56.10362048369453},
        {lat: -34.885853256003585, lng: -56.105183356422756},
        {lat: -34.88626116816509, lng: -56.107882863862386},
        {lat: -34.886727351014315, lng: -56.109445736590615},
        {lat: -34.88725180355765, lng: -56.11200316469112},
        {lat: -34.88725180355765, lng: -56.11399227543616},
        {lat: -34.88719353121787, lng: -56.11669178287579},
        {lat: -34.88725180429793, lng: -56.119888568001514},
        {lat: -34.886960441446256, lng: -56.123014313457986},
        {lat: -34.8869021689007, lng: -56.127063574617424},
        {lat: -34.88672735113605, lng: -56.130473478751085}
      ];
    
      var puntaGordaCoords = [
        {lat: -34.88588897121612, lng: -56.09884997896248},
        {lat: -34.89282338539522, lng: -56.093244648363694},
        {lat: -34.89500911202457, lng: -56.09149872571817},
        {lat: -34.89515984964812, lng: -56.09030414706598},
        {lat: -34.895385955565416, lng: -56.08910956841383},
        {lat: -34.895385955565416, lng: -56.08754742709962},
        {lat: -34.89515984964812, lng: -56.086720411109525},
        {lat: -34.89515984964812, lng: -56.08506637912929},
        {lat: -34.895385955565416, lng: -56.0843312538052},
        {lat: -34.89644110828334, lng: -56.083504237815106},
        {lat: -34.89794844579763, lng: -56.08249344049362},
        {lat: -34.899681849744056, lng: -56.08203398716624},
        {lat: -34.899681849744056, lng: -56.080839408514066},
        {lat: -34.89824990998163, lng: -56.078909704537125},
        {lat: -34.89734551411144, lng: -56.07753134455429},
        {lat: -34.8967425779995, lng: -56.07652054723283},
        {lat: -34.8967425779995, lng: -56.075234077915326},
        {lat: -34.89666721067395, lng: -56.07403949926315},
        {lat: -34.897270147340194, lng: -56.07247735794829},
        {lat: -34.89824990998163, lng: -56.07082332596872},
        {lat: -34.89824990998163, lng: -56.06953685665053},
        {lat: -34.89847600739319, lng: -56.06870984066043},
        {lat: -34.89870210418243, lng: -56.06760715267427},
        {lat: -34.89922966093725, lng: -56.06678013668419},
        {lat: -34.89900356560027, lng: -56.06521799536996},
        {lat: -34.898551373059156, lng: -56.0640234167178},
        {lat: -34.897571614012556, lng: -56.062828838065},
        {lat: -34.89515984964812, lng: -56.06016400876396},
        {lat: -34.89380320107519, lng: -56.06439097937985},
        {lat: -34.892597272424716, lng: -56.06760715267427},
        {lat: -34.8918435580281, lng: -56.070363872640684},
        {lat: -34.89086371897612, lng: -56.07293681127635},
        {lat: -34.890034615266124, lng: -56.07495840591861},
        {lat: -34.88882863129702, lng: -56.07734756322293},
        {lat: -34.88792413170412, lng: -56.07909348586848},
        {lat: -34.88747187817392, lng: -56.08028806452066},
        {lat: -34.88573821658261, lng: -56.08203398716624},
        {lat: -34.88490906115296, lng: -56.082861003156324},
        {lat: -34.88309996572107, lng: -56.083504237815106},
        {lat: -34.88340148439237, lng: -56.08653662977815},
        {lat: -34.883326104827994, lng: -56.089385240410536},
        {lat: -34.88355224331265, lng: -56.09131494438746},
        {lat: -34.88453216955587, lng: -56.093795992357144},
        {lat: -34.885135195281755, lng: -56.09618514966141},
        {lat: -34.88588897121612, lng: -56.09884997896248}
      ];
    
      var carrascoCoords = [
        {lat: -34.88297185089737, lng: -56.08343995154033},
        {lat: -34.885268373008564, lng: -56.08257915552721},
        {lat: -34.88747187817392, lng: -56.080012392523955},
        {lat: -34.88859744233799, lng: -56.07762323521962},
        {lat: -34.88995417679859, lng: -56.07486651525258},
        {lat: -34.89137374939003, lng: -56.071644166325754},
        {lat: -34.89214504461671, lng: -56.06926118465388},
        {lat: -34.892974127029426, lng: -56.066688246018856},
        {lat: -34.89508448087153, lng: -56.0600721180986},
        {lat: -34.891692814319434, lng: -56.05593703814871},
        {lat: -34.889883868237305, lng: -56.05180195819884},
        {lat: -34.88792413170412, lng: -56.04858578490442},
        {lat: -34.88671811675947, lng: -56.04491015828191},
        {lat: -34.882120022401466, lng: -56.03526163839929},
        {lat: -34.87857705291275, lng: -56.03691567037886},
        {lat: -34.876767818099516, lng: -56.03765079570361},
        {lat: -34.87616473097958, lng: -56.037099451710205},
        {lat: -34.87533547896513, lng: -56.03663999838214},
        {lat: -34.87669243245104, lng: -56.0514343955368},
        {lat: -34.878275516542224, lng: -56.069904419313275},
        {lat: -34.880989304051056, lng: -56.07771512588495},
        {lat: -34.88297185089737, lng: -56.08343995154033}
      ];

      var pocitosPolygon = new window.google.maps.Polygon({
        paths: pocitosCoords,
        strokeColor: '#FF0000',
        strokeOpacity: 0.8,
        strokeWeight: 2,
        fillColor: '#FF0000',
        fillOpacity: 0.2,
      });
    
      var puntaCarretasPolygon = new window.google.maps.Polygon({
        paths: puntaCarretasCoords,
        strokeColor: '#8A2BE2',
        strokeOpacity: 0.8,
        strokeWeight: 2,
        fillColor: '#8A2BE2',
        fillOpacity: 0.2,
      });
    
      var parqueBattlePolygon = new window.google.maps.Polygon({
        paths: parqueBattleCoords,
        strokeColor: '#0000FF',
        strokeOpacity: 0.8,
        strokeWeight: 2,
        fillColor: '#0000FF',
        fillOpacity: 0.2,
      });
    
      var malvinPolygon = new window.google.maps.Polygon({
        paths: malvinCoords,
        strokeColor: '#FF0000',
        strokeOpacity: 0.8,
        strokeWeight: 2,
        fillColor: '#FF0000',
        fillOpacity: 0.2,
      })
    
      var puntaGordaPolygon = new window.google.maps.Polygon({
        paths: puntaGordaCoords,
        strokeColor: '#8A2BE2',
        strokeOpacity: 0.8,
        strokeWeight: 2,
        fillColor: '#8A2BE2',
        fillOpacity: 0.2,
      })
    
      var carrascoPolygon = new window.google.maps.Polygon({
        paths: carrascoCoords,
        strokeColor: '#228B22',
        strokeOpacity: 0.8,
        strokeWeight: 2,
        fillColor: '#228B22',
        fillOpacity: 0.2,
      })

      const estaDentroDePocitos = window.google.maps.geometry.poly.containsLocation(ubicacion, pocitosPolygon);
      const estaDentroDePuntaCarretas = window.google.maps.geometry.poly.containsLocation(ubicacion, puntaCarretasPolygon);
      const estaDentroDeParqueBattle = window.google.maps.geometry.poly.containsLocation(ubicacion, parqueBattlePolygon);
      const estaDentroDeMalvin = window.google.maps.geometry.poly.containsLocation(ubicacion, malvinPolygon);
      const estaDentroDePuntaGorda = window.google.maps.geometry.poly.containsLocation(ubicacion, puntaGordaPolygon);
      const estaDentroDeCarrasco = window.google.maps.geometry.poly.containsLocation(ubicacion, carrascoPolygon);

      if (estaDentroDePocitos) {
        console.log('La ubicación está dentro de Pocitos');
      }

      if (estaDentroDePuntaCarretas) {
        console.log('La ubicación está dentro de Punta Carretas');
      }

      if (estaDentroDeParqueBattle) {
        console.log('La ubicación está dentro de Parque Battle');
      }

      if (estaDentroDeMalvin) {
        console.log('La ubicación está dentro de Malvín');
      }

      if (estaDentroDePuntaGorda) {
        console.log('La ubicación está dentro de Punta Gorda');
      }

      if (estaDentroDeCarrasco) {
        console.log('La ubicación está dentro de Carrasco');
      }

      const errorMessageElement = document.getElementById('error-message');
      if (!estaDentroDePocitos && !estaDentroDePuntaCarretas && !estaDentroDeParqueBattle && !estaDentroDeMalvin && !estaDentroDePuntaGorda && !estaDentroDeCarrasco) {
        errorMessageElement.textContent = 'La ubicación no se encuentra dentro de ninguna zona de cobertura';
      } else {
        errorMessageElement.textContent = '';
      }
    }
  };

  const handleServicioChange = (e) => {
    const nuevoServicio = e.target.value;
    setServicio(nuevoServicio);
    setFecha(null);
    setHorarioSeleccionado('');
    // Realiza una solicitud al servidor para obtener las fechas no disponibles para el nuevo servicio
    const fechasNoDisponiblesURL = `http://localhost:4000/fechasdisponibles/${nuevoServicio}`;

    fetch(fechasNoDisponiblesURL)
      .then((response) => {
        if (response.ok) {
          return response.json(); // Parsea la respuesta JSON
        } else {
          console.error('Error al realizar la petición');
          throw new Error('Error en la solicitud');
        }
      })
      .then((data) => {
        setFechasNoDisponibles(data.fechas_no_disponibles);
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  };

  const cargarHorariosDisponibles = (fechaSeleccionada) => {
    // Realiza una solicitud al servidor para obtener los horarios disponibles
  const horariosDisponiblesURL = `http://localhost:4000/horariosdisponibles/${servicio}/${fechaSeleccionada}`;
  console.log('URL de horarios disponibles:', horariosDisponiblesURL);

    fetch(horariosDisponiblesURL)
      .then((response) => {
        if (response.ok) {
          return response.json(); // Parsea la respuesta JSON
        } else {
          console.error('Error al obtener horarios disponibles');
          throw Error('Error en la solicitud');
        }
      })
      .then((data) => {
        setHorariosDisponibles(data.horarios);
        console.log('Horarios disponibles:', data.horarios);
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  };

  useEffect(() => {
    if (fecha) {
      cargarHorariosDisponibles(fecha.toISOString().slice(0, 10));
    }
  }, [fecha, servicio]);

  const backendURL = 'http://localhost:4000/reservations';

  const enviarReserva = () => {
    const reservaData = {
      servicio: servicio,
      fecha: fecha.toISOString().slice(0, 10),
      horario: horarioSeleccionado,
      ubicacion: ubicacion,
      user_email: userEmail,
    };

    console.log('Reserva:', reservaData);
    fetch(backendURL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(reservaData),
    })
      .then((response) => {
        if (response.ok) {
          console.log('Reserva exitosa');
        } else {
          console.error('Error al realizar la reserva');
        }
      })
      .catch((error) => {
        console.error('Error:', error);
      });

    setServicio('');
    setFecha(null);
    setHorarioSeleccionado(''); // Limpiamos el horario seleccionado
    setUbicacion('');
  };

  const fechasNoDisponiblesFormatted = fechasNoDisponibles ? fechasNoDisponibles.map((fecha) => new Date(fecha)) : [];

  const backendMercadoPagoURL = 'http://localhost:4000/crear-preferencia';

  const enviarReservaMercadoPago = () => {
    fetch(backendMercadoPagoURL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        title: 'Servicio',
        price: 100.0
      })
    })
    .then(response => {
      if (response.ok) {
        return response.json();
      }
      throw new Error('Error al crear la preferencia');
    })
    .then(data => {
      // Rediriges al usuario al enlace de pago
      console.log(data.init_point);
      //window.location.href = data.init_point;
    })
    .catch(error => {
      console.error('Error:', error);
    });
  };

  return (
    <div className="products-container" style={{ marginTop: '40px', width: '100%', maxWidth: '700px' }}>
      <h2>Reservar un Servicio</h2>
      <form>
        <div className="form-group" style={{ marginTop: '40px', width: '100%', maxWidth: '700px' }}>
          <label>Selecciona un servicio:</label>
          <select className="select" value={servicio} onChange={handleServicioChange}>
            <option value="">Selecciona un servicio</option>
            {servicios.map((s, index) => (
              <option key={index} value={s}>
                {s}
              </option>
            ))}
          </select>
        </div>
        {servicio && (
          <>
            <div className="form-group">
              <label>Selecciona una fecha:</label>
              <DatePicker
                selected={fecha}
                onChange={(date) => setFecha(date)}
                dateFormat="P"
                className="select"
                excludeDates={fechasNoDisponiblesFormatted}
                style={{ width: '100%', maxWidth: '700px' }}
              />
            </div>
            {fecha && (
              <div className="form-group" style={{ marginTop: '40px', width: '100%', maxWidth: '700px' }}>
                <label>Selecciona un horario:</label>
                <select className="select" value={horarioSeleccionado} onChange={(e) => setHorarioSeleccionado(e.target.value)}>
                  <option value="">Selecciona un horario</option>
                  {horariosDisponibles.map((h, index) => (
                    <option key={index} value={h}>
                      {h}
                    </option>
                  ))}
                </select>
              </div>
            )}
          </>
        )}
        {horarioSeleccionado && (
          <div className="form-group" style={{ marginTop: '40px', width: '100%', maxWidth: '700px' }}>
            <label>Especifique una ubicación:</label>
            <AutocompleteInput onPlaceSelected={handlePlaceSelect} />
            <div id="error-message" style={{ color: 'red' }}></div>
          </div>
        )}
        {ubicacion && (
          <button className="btn-reservar" type="button" onClick={() => {enviarReserva();/*</form> enviarReservaMercadoPago();*/}}>
            Pagar
          </button>
        )}
      </form>
    </div>
  );
};

export default Reservations;
