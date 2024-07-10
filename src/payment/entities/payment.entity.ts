import { Preference } from "mercadopago";
import { Booking } from "src/booking/entities/booking.entity";
import { MercadoPago } from "src/mercado_pago/entities/mercado_pago.entity";
import { Column, Entity, JoinColumn, OneToOne, PrimaryColumn } from "typeorm";


@Entity('payments')
export class Payment {

    @PrimaryColumn()
    private payment_id: number;

    @Column()
    private status: string;

    @Column()
    private payment_type: string;

    @Column()
    private merchant_order_id: number;

    @Column()
     id_preference: string;

    @Column()
    private processing_mode: string;

    @OneToOne(() => MercadoPago, mercadoPago => mercadoPago.payment)
    @JoinColumn({ name: "id_preference" })
    mercadoPago: MercadoPago;

    constructor( payment_id: number, status: string, payment_type: string, merchant_order_id: number, id_preference: string, processing_mode: string ) {
        this.payment_id = payment_id;
        this.status = status;
        this.payment_type = payment_type;
        this.merchant_order_id = merchant_order_id;
        this.id_preference = id_preference;
        this.processing_mode = processing_mode;
    }

    getPaymentId(): number { return this.payment_id };
    
    getStatus(): string { return this.status };
    
    getPaymentType(): string { return this.payment_type };

    getMerchantOrderId(): number { return this.merchant_order_id };

    getPreferenceId(): string { return this.id_preference };

    getProcessimgMode(): string { return this.processing_mode };

}
