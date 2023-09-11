<?php
//coneccion a la base de datos
mysqli_connect($Host.":".$Puerto,$User,$Password);
/* mysql_select_db ($Bd); */
 
$tipoimpresion = $_GET['tipoimpresion'];

//
$fechaini = $_GET['fechaini'];
$fechafin = $_GET['fechafin'];

//depende del tipo de impresion seleccionado se usa un caso u otro
switch ($tipoimpresion) {
    case 'PDF':
        $extension = 'pdf';
        $destination = 31;
        break;
    case 'EXCEL': //Excel Formato
        $extension = 'xls';
        $destination = 38;
        break;
    case 'EXCELFORMATODATOS':  //Excel Formato Datos
        $extension = 'xls';
        $destination = 36;
        break;
    case 'EXCELDATOS':  //Excel Datos
        $extension = 'xls';
        $destination = 38;
        break;
}
 
$RutaReportes           = Configura('RUTAREPORTESCRYSTALREPORTSSLT',"","",$Host,$Puerto,$User,$Password,$Bd,$ClienteNumserie,$ClienteClave);
$NombreServidorReportes = Configura('NOMBRESERVIDORRPTCRYSTAL',"","",$Host,$Puerto,$User,$Password,$Bd,$ClienteNumserie,$ClienteClave);
$NombreDatabaseReportes = Configura('NOMBREDATABASERPTCRYSTAL',"","",$Host,$Puerto,$User,$Password,$Bd,$ClienteNumserie,$ClienteClave);
$NombreUserReportes     = Configura('NOMBREUSERRPTCRYSTAL',"","",$Host,$Puerto,$User,$Password,$Bd,$ClienteNumserie,$ClienteClave);
$NombrePassReportes     = Configura('NOMBREPASSRPTCRYSTAL',"","",$Host,$Puerto,$User,$Password,$Bd,$ClienteNumserie,$ClienteClave);
$Agregarlogo            = Configura('AGREGARLOGOENREPORTES',"","",$Host,$Puerto,$User,$Password,$Bd,$ClienteNumserie,$ClienteClave);
$PathLogo               = Configura('PATHLOGOENREPORTES',"","",$Host,$Puerto,$User,$Password,$Bd,$ClienteNumserie,$ClienteClave);
$Seccionlogo            = Configura('SECCIONLOGOENREPORTES',"","",$Host,$Puerto,$User,$Password,$Bd,$ClienteNumserie,$ClienteClave);
$PosicionXLogo          = Configura('POSICIONXLOGOENREPORTES',"","",$Host,$Puerto,$User,$Password,$Bd,$ClienteNumserie,$ClienteClave);
$PosicionYLogo          = Configura('POSICIONYLOGOENREPORTES',"","",$Host,$Puerto,$User,$Password,$Bd,$ClienteNumserie,$ClienteClave);
$CARTERAENDOLARES       = Configura('CARTERAENDOLARES',"","0",$Host,$Puerto,$User,$Password,$Bd,$ClienteNumserie,$ClienteClave);
 
$my_report = $RutaReportes."reportsfiles\\$ClienteNumserie\\ROTACIONDIASD.rpt";
if(file_exists($my_report)){ //Verifico si realmente existe, si es True entra y lo toma.
    $my_report = $RutaReportes."reportsfiles\\$ClienteNumserie\\ROTACIONDIASD.rpt";
}else{ //si es False tomara el Generico
    $my_report = $RutaReportes."reportsfiles\\reportesgenericos\\ROTACIONDIASD.rpt";
}
$upload_dir = "../reportsfiles/".$ClienteNumserie."/facturasgral/";
if(!is_dir($upload_dir)){
     @mkdir($upload_dir, 0777,true);
}
$nombrereporte = "";
$nombrereporte = "ROTACIONDIASD.".$extension;
$my_pdf = $RutaReportes."reportsfiles\\".$ClienteNumserie."\\facturasgral\\".$nombrereporte;
$ObjectFactory= new COM("CrystalReports115.ObjectFactory.1");
try {
    $crapp = $ObjectFactory->CreateObject("CrystalRunTime.Application.11");
    echo $my_report;
    $creport = $crapp->OpenReport($my_report, 1);
 
    $canttables = $creport->Database->Tables->Count;
    echo "<br>Tablas:".$canttables;
    for ($i = 1; $i <= $canttables; $i++)
    {
        $oldLocation = $creport->Database->Tables($i)->Location;
        echo "<br>Location:".$oldLocation;
       $creport->Database->Tables($i)->ConnectionProperties->DeleteAll();
       $creport->Database->Tables($i)->ConnectionProperties->Add("Connection String","Driver=MySQL ODBC 5.1 Driver;Server=". $NombreServidorReportes . ";Database=" . $NombreDatabaseReportes . ";UID=". $NombreUserReportes .";PWD=". $NombrePassReportes . ";");
       $newLocation = $NombreDatabaseReportes . "." . $oldLocation;
       echo "<br>New Location:".$newLocation;
       $creport->Database->Tables($i)->Location = $newLocation;
    }
    $creport->EnableParameterPrompting = 0;
    $creport->DiscardSavedData;
    if ($Agregarlogo==1) {
      $my_logo = $RutaReportes.$PathLogo;
      if (file_exists($my_logo)) {
        $creport->Sections((int)$Seccionlogo)->AddPictureObject($my_logo, $PosicionXLogo, $PosicionYLogo);
      }
    }
 
    if($CARTERAENDOLARES == 1 || $CARTERAENDOLARES =="1"){
        $CARTERAENDOLARES = TRUE;
    }else{
        $CARTERAENDOLARES = FALSE;
    }
 
    $creport->ParameterFields(1)->AddCurrentValue("$cveini");
    $creport->ParameterFields(2)->AddCurrentValue("$cvefin");
    $creport->ParameterFields(3)->AddCurrentValue("$fechaini");
    $creport->ParameterFields(4)->AddCurrentValue("$fechafin");
    $creport->ParameterFields(5)->AddCurrentValue($CARTERAENDOLARES);
    $creport->ReadRecords();
    $creport->ExportOptions->DiskFileName=$my_pdf;
    $creport->ExportOptions->FormatType=$destination;
    $creport->ExportOptions->DestinationType=1;
    $creport->Export(false);
    $creport = null;
    $crapp = null;
    $ObjectFactory = null;
 
    $nombre_fichero = $upload_dir.$nombrereporte;
    headerFunction($nombre_fichero);
} catch (com_exception $e){
    echo("<br>Error En Creacion de Instancia:<br>".$e->getMessage().'<p>'.$e->getTraceAsString().'</p>');
    echo "<p><pre>".print_r($e, true)."</pre></p>";
    exit;
}

?>