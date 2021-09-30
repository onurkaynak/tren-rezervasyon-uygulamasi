module.exports = (req, res, next) => {
  const tren = req.body.Tren;
  let rezervasyonYapilabilir = false;
  let yerlesimAyrinti = [];

  let kalanYolcu = tren.RezervasyonYapilacakKisiSayisi;

  for (const vagon of tren.Vagonlar) {
    const kalanKoltuk = Math.floor((vagon.Kapasite * 70 / 100) - vagon.DoluKoltukAdet);

    if (kalanKoltuk < 1) {
      continue;
    }

    if (kalanKoltuk >= kalanYolcu) {
      yerlesimAyrinti.push(
        {
          VagonAdi: vagon.Ad,
          KisiSayisi: kalanYolcu
        }
      );
      rezervasyonYapilabilir = true;

      break;
    }

    if (tren.KisilerFarkliVagonlaraYerlestirilebilir) {
      yerlesimAyrinti.push(
        {
          VagonAdi: vagon.Ad,
          KisiSayisi: kalanKoltuk
        }
      );

      kalanYolcu = kalanYolcu - kalanKoltuk;
    }
  }

  if (!rezervasyonYapilabilir) {
    yerlesimAyrinti = [];
  }

  return res.status(200).json(
    {
      "RezervasyonYapilabilir": rezervasyonYapilabilir,
      "YerlesimAyrinti": yerlesimAyrinti
    }
  );
};
