import Image from "next/image";
import { testimonials } from "../constants/testimonials";
import clsx from "clsx";

type Testimonial = {
  id: string;
  name: string;
  role: string;
  avatarUrl: string;
  comment: string;
};

const TestimonialItem = ({
  item,
  containerClassName,
}: {
  item: Testimonial;
  containerClassName: string;
}) => {
  return (
    <div
      className={clsx(
        "relative px-14 pb-14 pt-11 after:absolute after:bottom-0 after:right-0 after:h-0.5 after:w-screen after:bg-s2 after:content-[''] max-md:px-0 max-md:pt-11 after:max-md:-right-4",
        containerClassName
      )}
    >
      <blockquote className="h6 mb-8 text-[15px]" tabIndex={-1}>
        {item.comment}
      </blockquote>

      <div className="flex items-center max-xl:-mr-8">
        <div className="mr-4 size-20 shrink-0 rounded-full">
          <Image
            height={80}
            width={80}
            src={item.avatarUrl}
            alt={`Avatar of ${item.name}`}
            className="size-full object-cover"
          />
        </div>
        <div>
          <h4 className="body-2 mb-0.5 text-p1">{item.name}</h4>
          <p className="uppercase text-chart-3 text-[12px]">{item.role}</p>
        </div>
      </div>
    </div>
  );
};

const Testimonials = () => {
  const halfLength = Math.floor(testimonials.length / 2);

  return (
    <section
      aria-labelledby="testimonials-heading"
      className="mt-[50px] relative max-w-[1440px] w-full mx-auto px-16 py-3 max-sm:px-8 max-sm:py-4 mb-[100px]"
    >
      <div className="container block lg:flex">
        <div className="relative z-2">
          <p className="text-chart-3 text-heading3">Wall of review</p>
          <h3
            id="testimonials-heading"
            className="text-[15px] mb-[50px]"
            tabIndex={-1}
          >
            Words from our users
          </h3>
        </div>

        <div className="relative -my-12 -mr-3 flex items-start max-lg:static max-md:block">
          <div>
            {testimonials.slice(0, halfLength).map((testimonial) => (
              <TestimonialItem
                key={testimonial.id}
                item={testimonial}
                containerClassName="last:after:hidden last:after:max-md:block"
              />
            ))}
          </div>

          <div>
            {testimonials.slice(halfLength).map((testimonial) => (
              <TestimonialItem
                key={testimonial.id}
                item={testimonial}
                containerClassName="last:after:hidden after:right-auto after:left-0 after:max-md:-left-4 md:px-12"
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
