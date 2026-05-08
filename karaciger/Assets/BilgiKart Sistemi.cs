using UnityEngine;
using TMPro;
using UnityEngine.UI;

public class BilgiKartSistemi : MonoBehaviour
{
    public Image kartResmi;
    public TextMeshProUGUI kartMetni;
    
    public Sprite[] resimler; 
    [TextArea] public string[] bilgiler; 
    
    private int aktifKartIndex = 0;

    void Start() 
    {
        Kartiguncelle();
    }

    public void SonrakiKart()
    {
        if (bilgiler.Length == 0) return;
        aktifKartIndex = (aktifKartIndex + 1) % bilgiler.Length;
        Kartiguncelle();
    }

    public void OncekiKart()
    {
        if (bilgiler.Length == 0) return;
        aktifKartIndex--;
        if (aktifKartIndex < 0) aktifKartIndex = bilgiler.Length - 1;
        Kartiguncelle();
    }

    void Kartiguncelle()
    {
        if (bilgiler.Length > 0)
        {
            kartMetni.text = bilgiler[aktifKartIndex];
            if (resimler.Length > aktifKartIndex) 
                kartResmi.sprite = resimler[aktifKartIndex];
        }
    }
}
