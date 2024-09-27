import { Injectable } from '@nestjs/common';
// Import the correct soap module
import * as soap from 'strong-soap';

@Injectable()
export class AuthenticationService {
  private readonly url = 'https://tckimlik.nvi.gov.tr/Service/KPSPublic.asmx?wsdl';

  async validateTCKimlikNo(tckimlikNo: string, ad: string, soyad: string, dogumYili: number): Promise<boolean> {
    return new Promise((resolve, reject) => {

      soap.soap.createClient(this.url, (err, client) => {
        if (err) {
          return reject(err);
        }

        const args = {
          TCKimlikNo: tckimlikNo,
          Ad: ad,
          Soyad: soyad,
          DogumYili: dogumYili,
        };

        client.TCKimlikNoDogrula(args, (err, result) => {
          if (err) {
            return reject(err);
          }
          resolve(result.TCKimlikNoDogrulaResult);
        });
      });
    });
  }
}
